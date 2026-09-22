# ==============================================================================
# Dockerfile - Pokédex Ultime
# Image ultra-légère basée sur Nginx Alpine (< 25 Mo)
# ==============================================================================

FROM nginx:alpine

# Suppression de la page d'accueil par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie de la configuration Nginx optimisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie des fichiers statiques du Pokédex
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY data/ /usr/share/nginx/html/data/
COPY manifest.webmanifest /usr/share/nginx/html/

# Expose le port HTTP
EXPOSE 80

# Démarrage de Nginx au premier plan
CMD ["nginx", "-g", "daemon off;"]
