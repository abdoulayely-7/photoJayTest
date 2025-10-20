# FOTOL JAY Frontend

Frontend Angular pour l'application FOTOL JAY - une plateforme de marketplace pour la vente de produits d'occasion.

## 📋 Description

FOTOL JAY est une application web moderne développée avec Angular qui permet aux utilisateurs de vendre et acheter des produits d'occasion. L'interface utilisateur offre une expérience fluide avec un système de modération, gestion des vendeurs, et fonctionnalités avancées comme la prise de photos directement depuis l'appareil.

## 🛠️ Technologies Utilisées

- **Framework**: Angular 20.3.0
- **Langage**: TypeScript
- **Styling**: CSS natif avec support des thèmes
- **Routing**: Angular Router
- **State Management**: Signals (nouveau système de réactivité Angular)
- **HTTP Client**: Angular HttpClient
- **Validation**: Zod pour la validation des formulaires
- **Icônes**: Lucide Angular
- **Notifications**: SweetAlert2 pour les modales
- **Tests**: Playwright pour les tests E2E, Karma pour les tests unitaires
- **SSR**: Angular Server-Side Rendering
- **Linting**: ESLint avec configuration Angular

## 🚀 Installation et Configuration

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend FOTOL JAY en cours d'exécution

### Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd fottoljay/front
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**

   Créer un fichier `src/environments/environment.ts` :
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api'
   };
   ```

   Et `src/environments/environment.prod.ts` pour la production :
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://your-production-api.com/api'
   };
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm start
   ```

   L'application sera accessible sur `http://localhost:4200/`

## 📜 Scripts Disponibles

- `npm start` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run watch` - Construit l'application en mode watch
- `npm test` - Lance les tests unitaires avec Karma
- `npm run test:e2e` - Lance les tests end-to-end avec Playwright
- `npm run test:e2e:headed` - Lance les tests E2E en mode visible
- `npm run test:e2e:ui` - Lance l'interface Playwright pour les tests
- `npm run lint` - Vérifie le code avec ESLint
- `npm run serve:ssr:front` - Sert l'application avec SSR

## 🏗️ Structure du Projet

```
front/
├── src/
│   ├── app/
│   │   ├── components/          # Composants Angular
│   │   │   ├── home/            # Page d'accueil
│   │   │   ├── sell/            # Espace vendeur
│   │   │   ├── admin/           # Panel d'administration
│   │   │   ├── login/           # Connexion admin/modérateur
│   │   │   ├── seller-auth/     # Authentification vendeur
│   │   │   ├── notification-bell/ # Cloche de notifications
│   │   │   ├── theme-selector/  # Sélecteur de thème
│   │   │   └── toast/           # Système de notifications toast
│   │   ├── services/            # Services Angular
│   │   │   ├── api.service.ts   # Service API principal
│   │   │   ├── auth.service.ts  # Gestion de l'authentification
│   │   │   ├── toast.service.ts # Service de notifications
│   │   │   └── notification.service.ts # Service notifications
│   │   ├── models/              # Modèles TypeScript
│   │   │   └── product.model.ts # Interfaces et types
│   │   ├── schemas/             # Schémas de validation Zod
│   │   │   └── login.schema.ts  # Validation des formulaires
│   │   ├── directives/          # Directives personnalisées
│   │   │   └── no-download.directive.ts # Directive anti-téléchargement
│   │   ├── app.routes.ts        # Configuration des routes
│   │   ├── app.ts               # Composant racine
│   │   └── app.config.ts        # Configuration Angular
│   ├── environments/            # Configuration par environnement
│   ├── styles.css               # Styles globaux
│   └── main.ts                  # Point d'entrée
├── public/                      # Assets statiques
├── e2e/                         # Tests end-to-end
├── playwright.config.ts         # Configuration Playwright
├── angular.json                 # Configuration Angular CLI
├── tsconfig.json                # Configuration TypeScript
└── package.json
```

## 🧭 Pages et Fonctionnalités

### Page d'Accueil (`/`)
- **Affichage des produits** : Grille responsive des produits approuvés
- **Recherche** : Recherche en temps réel par titre et description
- **Modal de détail** : Vue détaillée des produits avec carrousel d'images
- **Navigation responsive** : Menu mobile avec sélecteur de thème
- **Thèmes** : Support sombre/clair avec persistance

### Espace Vendeur (`/sell`)
- **Authentification requise** : Accès protégé pour les vendeurs
- **Publication de produits** : Formulaire complet avec validation
- **Upload de photos** : Support caméra mobile + sélection fichiers
- **Dashboard vendeur** : Gestion des produits personnels
- **Statistiques** : Nombre de vues, produits actifs
- **Filtrage** : Par statut (en attente/approuvé/rejeté)

### Panel d'Administration (`/admin`)
- **Modération** : Approuver/rejeter les produits en attente
- **Gestion des catégories** : CRUD complet des catégories
- **Vue d'ensemble** : Produits approuvés et en attente
- **Actions administratives** : Interface pour modérateurs/admins

### Authentification Vendeur (`/seller-auth`)
- **Connexion vendeur** : Accès à l'espace vendeur
- **Gestion de session** : Token JWT avec persistance

### Connexion Admin (`/login`)
- **Authentification admin/modérateur** : Accès au panel d'administration
- **Rôles différenciés** : Permissions selon le rôle utilisateur

## 🎨 Thèmes et UI/UX

### Système de Thèmes
- **Thème clair/sombre** : Basculement fluide avec persistance
- **Variables CSS** : Thèmes configurables via variables CSS
- **Icônes Lucide** : Bibliothèque d'icônes cohérente
- **Design responsive** : Optimisé pour mobile et desktop

### Composants Clés
- **Toast notifications** : Feedback utilisateur non-intrusif
- **Modales SweetAlert2** : Confirmations et alertes élégantes
- **Carrousel d'images** : Navigation fluide dans les galeries
- **Formulaires validés** : Validation en temps réel avec Zod

## 🔧 Services et Architecture

### ApiService
- **Centralisation des appels API** : Toutes les requêtes HTTP
- **Gestion des headers** : Authentification automatique
- **Types TypeScript** : Interfaces strongly-typed
- **Gestion d'erreurs** : Traitement uniforme des erreurs

### AuthService
- **Gestion d'état** : Utilisation des Signals Angular
- **Persistance** : Stockage localStorage du token
- **Vérification automatique** : Validation du token au démarrage
- **Rôles et permissions** : Méthodes utilitaires pour les contrôles d'accès

### Validation avec Zod
- **Schémas de validation** : `loginSchema` et `productSchema`
- **Messages d'erreur** : Personnalisés et localisés en français
- **Type safety** : Inférence de types automatique

## 📱 Fonctionnalités Avancées

### Upload de Photos
- **Caméra mobile** : Prise de photos directement dans l'app
- **Sélection fichiers** : Upload traditionnel avec drag & drop
- **Validation** : Types, tailles et nombre de fichiers
- **Aperçu** : Prévisualisation avant envoi

### Système de Notifications
- **Toast system** : Notifications non-bloquantes
- **SweetAlert2** : Modales d'interaction
- **Feedback utilisateur** : Confirmation des actions importantes

### Responsive Design
- **Mobile-first** : Optimisé pour appareils mobiles
- **Breakpoints** : Adaptation fluide à toutes les tailles
- **Navigation mobile** : Menu hamburger et gestes tactiles

## 🧪 Tests

### Tests Unitaires (Karma)
```bash
npm test
```
- Tests des composants, services et utilitaires
- Configuration Karma avec Chrome headless

### Tests End-to-End (Playwright)
```bash
npm run test:e2e          # Mode headless
npm run test:e2e:headed   # Mode visible
npm run test:e2e:ui       # Interface Playwright
```
- Tests complets du workflow utilisateur
- Validation des fonctionnalités critiques

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```
- Optimisation automatique (minification, tree-shaking)
- Génération de hashes pour le cache-busting
- Support SSR pour de meilleures performances SEO

### Configuration SSR
- **Server-Side Rendering** : Amélioration du SEO et des performances
- **Hydratation** : Transition fluide client/serveur

### Variables d'Environnement
- **Environnements multiples** : Développement, staging, production
- **Configuration API** : URLs différentes par environnement

## 🔐 Sécurité

### Authentification
- **JWT Tokens** : Authentification stateless
- **Protection des routes** : Guards Angular pour l'accès protégé
- **Expiration automatique** : Gestion des sessions expirées

### Validation
- **Zod schemas** : Validation côté client
- **Express Validator** : Validation côté serveur (backend)
- **Sanitisation** : Nettoyage des entrées utilisateur

### Bonnes Pratiques
- **Content Security Policy** : Headers de sécurité
- **Anti-download directive** : Protection des images
- **Validation stricte** : Toutes les entrées utilisateur validées

## 📊 Performance

### Optimisations
- **Lazy loading** : Chargement à la demande des modules
- **Signals Angular** : Système de réactivité performant
- **SSR** : Amélioration du First Contentful Paint
- **Image optimization** : Cloudinary pour les médias

### Métriques
- **Bundle size** : Suivi de la taille des chunks
- **Core Web Vitals** : Monitoring des performances
- **Lighthouse** : Audit automatique des performances

## 🛠️ Développement

### Code Style
- **Prettier** : Formatage automatique du code
- **ESLint** : Linting avec règles Angular
- **TypeScript strict** : Mode strict activé

### Git Workflow
- **Conventional commits** : Format standardisé des commits
- **Branches feature** : Développement isolé
- **Pull requests** : Revue de code systématique

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'feat: ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 Scripts de Développement

### Démarrage rapide
```bash
# Installation
npm install

# Développement
npm start

# Tests
npm test
npm run test:e2e

# Build
npm run build
```

## 📄 Licence

ISC

## 📞 Support

Pour toute question ou problème, veuillez contacter l'équipe de développement.
