# 🚀 Guide de Déploiement sur Sous-Domaine : `pokedex.<votre-domaine.com>`

Ce guide vous explique pas à pas comment déployer votre Pokédex Ultime sur votre sous-domaine personnalisé (par exemple `pokedex.monsite.fr` ou `pokedex.monnom.com`).

---

## 🌐 Étape 1 : Configuration DNS de votre sous-domaine

Quelle que soit la méthode d'hébergement choisie, vous devez d'abord déclarer le sous-domaine `pokedex` chez votre registrar (OVH, Cloudflare, Namecheap, Hostinger, Gandi, etc.).

### Cas A : Déploiement sur un VPS / Serveur Dédié (Docker ou Nginx direct)
Créez un enregistrement de type **A** :
* **Type** : `A`
* **Nom / Hôte** : `pokedex`
* **Valeur / Cible** : `IP_DE_VOTRE_VPS` (ex: `123.45.67.89`)
* **TTL** : Automatique ou 3600

### Cas B : Déploiement sur un Cloud (Vercel, Netlify, Cloudflare Pages, GitHub Pages)
Créez un enregistrement de type **CNAME** :
* **Type** : `CNAME`
* **Nom / Hôte** : `pokedex`
* **Valeur / Cible** : Fourni par le service (ex: `cname.vercel-dns.com` ou `votre-site.netlify.app`)

---

## 🛠️ Option 1 : Déploiement Docker (Recommandé pour VPS)

Le projet contient un `Dockerfile` optimisé sous Alpine Linux avec Nginx, compression Gzip et en-têtes de sécurité.

### 1. Avec Docker Compose
Lancez simplement :
```bash
docker compose up -d --build
```
Le Pokédex est accessible sur le port `8080` de votre machine (ex: `http://localhost:8080`).

### 2. Derrière un Reverse Proxy (Nginx, Traefik, Caddy, Nginx Proxy Manager, Coolify)
Faites pointer votre sous-domaine `pokedex.votre-domaine.com` vers le port interne `8080`.

Si vous utilisez **Nginx Proxy Manager** ou **Coolify** :
1. Créez un nouveau Proxy Host.
2. Domain Names : `pokedex.votre-domaine.com`
3. Forward Hostname / IP : `localhost` (ou l'IP du conteneur)
4. Forward Port : `8080`
5. Cochez "Block Common Exploits" et activez le certificat SSL Let's Encrypt ("Request a new SSL Certificate").

---

## 🐧 Option 2 : Déploiement direct avec Nginx sur votre VPS

Un fichier modèle `nginx-subdomain.conf` est fourni à la racine.

1. Copiez les fichiers du projet sur votre serveur :
   ```bash
   scp -r . user@votre-ip:/var/www/pokedex
   ```
2. Copiez la configuration Nginx :
   ```bash
   sudo cp nginx-subdomain.conf /etc/nginx/sites-available/pokedex.conf
   ```
3. Remplacez `pokedex.votre-domaine.com` et `/var/www/pokedex` par vos valeurs réelles.
4. Activez le site et testez la configuration :
   ```bash
   sudo ln -s /etc/nginx/sites-available/pokedex.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
5. Obtenez un certificat SSL gratuit avec Let's Encrypt :
   ```bash
   sudo certbot --nginx -d pokedex.votre-domaine.com
   ```

---

## ⚡ Option 3 : Déploiement 1-Clic sur Vercel (100% Gratuit)

Le projet inclut un fichier `vercel.json` préconfiguré.

1. Installez la CLI Vercel (`npm i -g vercel`) ou connectez votre dépôt GitHub à [vercel.com](https://vercel.com).
2. Lancez :
   ```bash
   vercel --prod
   ```
3. Dans le tableau de bord Vercel de votre projet :
   * Allez dans **Settings** > **Domains**.
   * Ajoutez : `pokedex.votre-domaine.com`.
   * Suivez l'instruction DNS (création du CNAME vers `cname.vercel-dns.com`).
   * Vercel génère le certificat SSL automatiquement !

---

## 🍃 Option 4 : Déploiement sur Netlify

Le projet inclut un fichier `netlify.toml`.

1. Importez votre dépôt sur [netlify.com](https://netlify.com).
2. Laissez le build command vide (site statique).
3. Dans **Domain management**, ajoutez le sous-domaine `pokedex.votre-domaine.com`.
4. Ajoutez le CNAME indiqué par Netlify sur votre DNS.

---

## 🐙 Option 5 : GitHub Pages avec Sous-Domaine personnalisé

1. Dans les paramètres de votre dépôt GitHub : **Settings** > **Pages**.
2. Source : Déployez depuis la branche `master` ou `main`, dossier `/ (root)`.
3. Sous **Custom domain**, entrez : `pokedex.votre-domaine.com`.
4. Cochez **Enforce HTTPS**.
5. Ajoutez un enregistrement CNAME sur votre DNS : `pokedex` ➔ `<votre-pseudo>.github.io`.

---

## ✅ Vérification finale
Une fois déployé, visitez `https://pokedex.votre-domaine.com` :
* Testez le chargement des images et des polices.
* Testez le partage d'URL direct avec le nouveau sous-domaine : `https://pokedex.votre-domaine.com/?pokemon=25` !
* Testez l'installation PWA ("Installer l'application" sur Chrome / Safari / Edge).
