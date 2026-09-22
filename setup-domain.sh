#!/usr/bin/env bash
# ==============================================================================
# Script de configuration automatique pour pokedex.rqrqrqrqrqrqrqrq.space
# Supporte Caddy natif et Caddy sous Docker (Mapora)
# ==============================================================================
set -e

DOMAIN="pokedex.rqrqrqrqrqrqrqrq.space"
echo "🚀 Configuration du sous-domaine https://$DOMAIN..."

# 1. Vérifier si Caddy tourne dans un conteneur Docker (ex: mapora-caddy-1)
CADDY_CONTAINER=$(docker ps --filter "ancestor=caddy:alpine" --format "{{.Names}}" | head -n 1)
if [ -z "$CADDY_CONTAINER" ]; then
    CADDY_CONTAINER=$(docker ps --filter "name=caddy" --format "{{.Names}}" | head -n 1)
fi

if [ -n "$CADDY_CONTAINER" ]; then
    echo "🔍 Conteneur Caddy détecté : $CADDY_CONTAINER"

    # Trouver le chemin de Caddyfile sur l'hôte
    CADDYFILE=$(docker inspect "$CADDY_CONTAINER" --format '{{range .Mounts}}{{if eq .Destination "/etc/caddy/Caddyfile"}}{{.Source}}{{end}}{{end}}')
    if [ -z "$CADDYFILE" ] && [ -f "$HOME/Mapora/Caddyfile" ]; then
        CADDYFILE="$HOME/Mapora/Caddyfile"
    fi

    if [ -n "$CADDYFILE" ] && [ -f "$CADDYFILE" ]; then
        echo "📄 Caddyfile trouvé à : $CADDYFILE"
        if grep -q "$DOMAIN" "$CADDYFILE"; then
            echo "✅ Le sous-domaine $DOMAIN est déjà configuré dans $CADDYFILE."
        else
            echo "➕ Ajout de la règle dans $CADDYFILE..."
            echo -e "\n$DOMAIN {\n    reverse_proxy 172.17.0.1:8080\n}" | tee -a "$CADDYFILE" > /dev/null
            echo "✅ Règle ajoutée !"
        fi
    else
        echo "➕ Ajout de la règle directement dans le conteneur Caddy..."
        docker exec "$CADDY_CONTAINER" sh -c "grep -q '$DOMAIN' /etc/caddy/Caddyfile || echo -e '\n$DOMAIN {\n    reverse_proxy 172.17.0.1:8080\n}' >> /etc/caddy/Caddyfile"
    fi

    echo "🔄 Rechargement de Caddy..."
    docker exec "$CADDY_CONTAINER" caddy reload 2>/dev/null || docker restart "$CADDY_CONTAINER"
    echo "✅ Caddy rechargé !"

    # Connecter le conteneur Pokédex au même réseau que Caddy
    CADDY_NET=$(docker inspect "$CADDY_CONTAINER" -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' | awk '{print $1}')
    if [ -n "$CADDY_NET" ]; then
        docker network connect "$CADDY_NET" pokedex-app 2>/dev/null || true
    fi

elif [ -f "/etc/caddy/Caddyfile" ]; then
    echo "🔍 Caddy natif détecté dans /etc/caddy/Caddyfile"
    if sudo grep -q "$DOMAIN" "/etc/caddy/Caddyfile"; then
        echo "✅ Déjà présent dans /etc/caddy/Caddyfile."
    else
        echo -e "\n$DOMAIN {\n    reverse_proxy localhost:8080\n}" | sudo tee -a /etc/caddy/Caddyfile > /dev/null
    fi
    sudo systemctl reload caddy || sudo caddy reload --config /etc/caddy/Caddyfile
fi

# 2. Démarrer / Vérifier le conteneur Pokédex
echo "🐳 Démarrage du conteneur Pokédex..."
docker compose up -d --build

echo ""
echo "🎉 Terminé ! Votre Pokédex est actif sur :"
echo "👉 https://$DOMAIN"
