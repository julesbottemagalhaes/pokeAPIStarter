#!/usr/bin/env bash
# ==============================================================================
# Script de configuration automatique pour pokedex.rqrqrqrqrqrqrqrq.space
# ==============================================================================
set -e

DOMAIN="pokedex.rqrqrqrqrqrqrqrq.space"
CADDYFILE="/etc/caddy/Caddyfile"

echo "🚀 Configuration du sous-domaine https://$DOMAIN..."

# 1. Vérification et mise à jour de Caddyfile
if [ -f "$CADDYFILE" ]; then
    if sudo grep -q "$DOMAIN" "$CADDYFILE"; then
        echo "✅ Le sous-domaine $DOMAIN est déjà configuré dans $CADDYFILE."
    else
        echo "➕ Ajout de la règle de reverse proxy dans $CADDYFILE..."
        echo -e "\n$DOMAIN {\n    reverse_proxy localhost:8080\n}" | sudo tee -a "$CADDYFILE" > /dev/null
        echo "✅ Configuration ajoutée avec succès !"
    fi

    echo "🔄 Rechargement de Caddy..."
    if command -v systemctl >/dev/null 2>&1; then
        sudo systemctl reload caddy || sudo caddy reload --config "$CADDYFILE"
    else
        sudo caddy reload --config "$CADDYFILE"
    fi
    echo "✅ Caddy rechargé !"
else
    echo "⚠️ Le fichier $CADDYFILE n'existe pas ou Caddy tourne dans un autre conteneur."
fi

# 2. Démarrage / Mise à jour du conteneur Docker Pokédex
echo "🐳 Démarrage du conteneur Pokédex sur le port 8080..."
docker compose up -d --build

echo ""
echo "🎉 Terminé ! Votre Pokédex est accessible sur :"
echo "👉 https://$DOMAIN"
