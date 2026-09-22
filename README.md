# ⚡ POKÉDEX ULTIME 🎮

Une application Pokédex moderne, réactive et complète propulsée par l'API TyraDex et PokeAPI, conçue pour être déployée instantanément sur votre sous-domaine personnalisé : **`pokedex.<votre-domaine.com>`**.

![Pokédex Ultime Preview](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

---

## ✨ Fonctionnalités Principales

### 🔍 Filtres & Recherche Multi-Critères
* **Recherche instantanée** : Par nom (Français, Anglais, Japonais), par numéro (#025, 25), par type (*feu, eau, plante*), ou par talent (*Brasier, Lévitation, Intimidation*).
* **Filtres par Type** : 18 types élémentaires avec icônes officielles, couleur thématique et lueur dynamique.
* **Filtres d'Attributs & Catégories** :
  * ⭐ **Favoris** (avec compteur en temps réel)
  * 🧬 **Évolutifs** (Pokémon pouvant encore évoluer)
  * 🏆 **Stade Final** (Formes ultimes de combat)
  * 👑 **Légendaires & Fabuleux** (Mewtwo, Artikodin, Rayquaza...)
  * ⚡ **Méga-Évolutions**
  * 💥 **Gigamax**
  * **Mono-type** vs **Double-type**

### 📊 Tri Avancé
* 🔢 Par numéro Pokédex (Croissant / Décroissant)
* 🔤 Alphabétique (A ➔ Z / Z ➔ A)
* ⚡ Total des statistiques (BST - Base Stat Total : Du plus puissant au plus faible)
* ⚔️ Attaque max (Offensif)
* 🛡️ Défense max (Tank)
* 💨 Vitesse max (Sprinter)
* ❤️ Points de Vie (PV max)
* ⚖️ Poids (Plus lourd / Plus léger)
* 📏 Taille (Plus grand / Plus petit)

### 🎒 Mon Équipe Pokémon (Team Builder 6 Places)
* Composez votre escouade de 6 Pokémon préférés en 1 clic grâce au bouton `+` présent sur chaque carte et dans la fiche détaillée.
* Tiroir rétractable d'équipe avec :
  * Visualisation des 6 combattants (sprites, types, noms).
  * Calcul de la puissance moyenne (BST moyen) de l'équipe.
  * **Analyse stratégique de couverture** : détection automatique des faiblesses partagées (ex: *3 Pokémon vulnérables face au type Roche*).
  * Sauvegarde automatique dans le `localStorage`.

### ⭐ Système de Favoris (Wishlist)
* Ajoutez n'importe quel Pokémon à vos favoris en cliquant sur l'étoile.
* Filtre rapide `⭐ Favoris` pour n'afficher que votre collection personnelle.
* Persistance automatique dans le navigateur.

### 🔊 Vrais Cris Officiels Pokémon
* Intégration des **cris audio authentiques** du Pokédex via le CDN PokeAPI (`cries`).
* Fallback automatique sur un synthétiseur rétro électronique (Web Audio API) en cas d'utilisation hors ligne.

### 🧬 Évolutions au Survol & 3D Tilt
* **Aperçu interactif au survol** : La carte fait défiler automatiquement toutes les évolutions du Pokémon en temps réel.
* **Effet holographique 3D** : Effet de brillance et inclinaison dynamique suivant la position du curseur.

### 🔗 Deep Linking & Partage sur Sous-Domaine
* L'URL s'adapte automatiquement : `https://pokedex.votre-domaine.com/?pokemon=25` ouvre directement la fiche de Pikachu !
* Bouton **"Partager"** dans la modale pour copier le lien direct en 1 clic.
* Support complet des paramètres `?gen=2`, `?search=dracaufeu`, `?filter=favorites`, etc.

### 📱 Progressive Web App (PWA)
* Fichier `manifest.webmanifest` inclus.
* Installable comme une application native sur Mobile (iOS & Android) et Desktop (Chrome, Edge, Safari).

### ⌨️ Raccourcis Clavier
* <kbd>/</kbd> ou <kbd>Ctrl</kbd> + <kbd>K</kbd> : Focus immédiat sur la barre de recherche
* <kbd>R</kbd> : Découvrir un Pokémon aléatoire
* <kbd>F</kbd> : Filtrer rapidement les favoris
* <kbd>T</kbd> : Ouvrir / fermer le tiroir d'équipe
* <kbd>Échap</kbd> : Fermer la fiche active ou le tiroir
* <kbd>←</kbd> / <kbd>→</kbd> : Naviguer entre Pokémon dans la fiche détaillée

---

## 🚀 Déploiement sur votre Sous-Domaine `pokedex`

Un guide complet pas à pas est disponible dans [DEPLOYMENT.md](file:///Users/julesbotte-magalhaes/Documents/Github/pokeAPIStarter/DEPLOYMENT.md).

### 1. Configuration DNS
Créez un enregistrement DNS chez votre registrar :
* **CNAME** : `pokedex` ➔ cible (ex: `cname.vercel-dns.com` ou votre hébergeur)
* **Ou A** : `pokedex` ➔ `IP_DE_VOTRE_SERVEUR`

### 2. Méthodes de déploiement disponibles
* 🐳 **Docker & Docker Compose** :
  ```bash
  docker compose up -d --build
  ```
  Accessible sur le port 8080 avec configuration Nginx haute performance intégrée (`nginx.conf`).
* 🌐 **Nginx VPS (Reverse Proxy ou Direct)** : Fichier modèle prêt à l'emploi `nginx-subdomain.conf`.
* ▲ **Vercel** : Fichier `vercel.json` inclus. Déployez avec `vercel --prod` puis ajoutez `pokedex.votre-domaine.com` dans le dashboard.
* 🍃 **Netlify** : Fichier `netlify.toml` inclus.
* 🐙 **GitHub Pages** : Fichier `CNAME` préconfiguré.

---

## 🛠️ Structure du Projet

```
.
├── index.html              # Interface principale avec Top-Layer Dialog & Tiroir d'équipe
├── css/
│   ├── normalize.css       # Normalisation CSS
│   └── style.css           # Thème sombre moderne, animations, glassmorphism, responsive
├── js/
│   └── script.js           # Logique applicative, gestion d'état, Audio API, filtres & tris
├── Dockerfile              # Image Nginx Alpine ultra-légère (< 25 Mo)
├── docker-compose.yml      # Orchestration Docker prête pour la production
├── nginx.conf              # Configuration serveur Nginx (Gzip, sécurité, cache)
├── nginx-subdomain.conf    # Exemple de VirtualHost pour pokedex.votre-domaine.com
├── manifest.webmanifest    # Manifest PWA (Application installable)
├── vercel.json             # Configuration Vercel
├── netlify.toml            # Configuration Netlify
├── CNAME                   # Fichier CNAME pour sous-domaine GitHub Pages
├── DEPLOYMENT.md           # Guide détaillé de déploiement pas à pas
└── README.md               # Documentation du projet
```

---

## 📄 Licence & Crédits
* Données propulsées par [TyraDex API](https://tyradex.app).
* Cris sonores officiels par [PokeAPI cries](https://github.com/PokeAPI/cries).
* Projet libre sous licence ISC.
