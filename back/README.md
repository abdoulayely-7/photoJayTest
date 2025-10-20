# FOTOL JAY Backend

Backend API pour l'application FOTOL JAY - une plateforme de marketplace pour la vente de produits d'occasion.

## 📋 Description

FOTOL JAY est une application web permettant aux utilisateurs de vendre et acheter des produits d'occasion. Le backend fournit une API REST complète pour gérer l'authentification, les produits, les catégories, la modération et les notifications.

## 🛠️ Technologies Utilisées

- **Runtime**: Node.js
- **Langage**: TypeScript
- **Framework**: Express.js
- **Base de données**: MySQL avec Prisma ORM
- **Authentification**: JWT (JSON Web Tokens)
- **Stockage d'images**: Cloudinary
- **Validation**: Express Validator
- **Sécurité**: Helmet, CORS
- **Email**: Nodemailer
- **Tâches planifiées**: Node-cron
- **Upload de fichiers**: Multer

## 🚀 Installation et Configuration

### Prérequis

- Node.js (version 18 ou supérieure)
- MySQL (version 8 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd fottoljay/back
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**

   Créer un fichier `.env` à la racine du projet :
   ```env
   # Base de données
   DATABASE_URL="mysql://username:password@localhost:3306/fotoljay_db"

   # JWT
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="7d"

   # Cloudinary (pour le stockage d'images)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # Email (pour les notifications)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-app-password"

   # Port du serveur
   PORT=3000

   # Environnement
   NODE_ENV="development"
   ```

4. **Configuration de la base de données**

   ```bash
   # Initialiser Prisma
   npm run prisma:init

   # Appliquer les migrations
   npm run prisma:migrate

   # Peupler la base avec des données de test
   npm run prisma:seed
   ```

5. **Démarrer le serveur**

   ```bash
   # Mode développement (avec rechargement automatique)
   npm run dev

   # Production
   npm run build
   npm start
   ```

## 📜 Scripts Disponibles

- `npm run build` - Compiler TypeScript vers JavaScript
- `npm start` - Démarrer le serveur en production
- `npm run dev` - Démarrer le serveur en mode développement avec nodemon
- `npm run prisma:init` - Initialiser Prisma
- `npm run prisma:migrate` - Appliquer les migrations de base de données
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:studio` - Ouvrir Prisma Studio (interface graphique)
- `npm run prisma:seed` - Peupler la base de données avec des données de test

## 🏗️ Structure du Projet

```
back/
├── src/
│   ├── controllers/          # Contrôleurs de l'API
│   │   ├── auth.controller.ts
│   │   ├── product.controller.ts
│   │   ├── user.controller.ts
│   │   ├── seller.controller.ts
│   │   └── notification.controller.ts
│   ├── middlewares/          # Middlewares personnalisés
│   │   ├── auth.middleware.ts
│   │   ├── rbac.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/               # Définition des routes
│   │   ├── auth.routes.ts
│   │   ├── product.routes.ts
│   │   ├── user.routes.ts
│   │   ├── seller.routes.ts
│   │   ├── category.routes.ts
│   │   └── notification.routes.ts
│   ├── services/             # Logique métier
│   │   ├── auth.service.ts
│   │   ├── product.service.ts
│   │   ├── user.service.ts
│   │   └── notification.service.ts
│   ├── utils/                # Utilitaires
│   │   ├── jwt.util.ts
│   │   ├── cloudinary.util.ts
│   │   ├── email.util.ts
│   │   ├── password.util.ts
│   │   └── cron.util.ts
│   └── server.ts             # Point d'entrée de l'application
├── prisma/
│   ├── schema.prisma         # Schéma de la base de données
│   ├── seed.ts              # Données de test
│   └── migrations/          # Migrations de base de données
├── public/uploads/          # Fichiers uploadés (images)
├── package.json
├── tsconfig.json
└── README.md
```

## 📡 API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription d'un vendeur
- `POST /api/auth/register-admin` - Création du premier administrateur
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Informations de l'utilisateur connecté
- `PUT /api/auth/change-password` - Changer le mot de passe
- `PUT /api/auth/initial-change-password` - Changement initial du mot de passe
- `POST /api/auth/complete-first-login` - Finalisation de la première connexion

### Produits

- `GET /api/products` - Liste des produits (public)
- `GET /api/products/:id` - Détails d'un produit (public)
- `POST /api/products` - Créer un produit (vendeur authentifié)
- `GET /api/products/seller` - Produits du vendeur connecté
- `DELETE /api/products/:id` - Supprimer un produit (admin)

### Modération

- `GET /api/products/moderation/pending` - Produits en attente de modération
- `POST /api/products/:id/approve` - Approuver un produit
- `POST /api/products/:id/reject` - Rejeter un produit

### Utilisateurs (Admin uniquement)

- `GET /api/users` - Liste de tous les utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur
- `PUT /api/users/:id/vip` - Modifier le statut VIP
- `PUT /api/users/:id/role` - Modifier le rôle
- `PUT /api/users/:id/status` - Activer/Désactiver un utilisateur

### Catégories

- `GET /api/categories` - Liste des catégories
- `POST /api/categories` - Créer une catégorie (admin)
- `PUT /api/categories/:id` - Modifier une catégorie (admin)
- `DELETE /api/categories/:id` - Supprimer une catégorie (admin)

### Notifications

- `GET /api/notifications` - Notifications de l'utilisateur
- `PUT /api/notifications/:id/read` - Marquer comme lu

## 🗄️ Modèles de Données

### User (Utilisateur)
- `id`: String (UUID)
- `email`: String (unique)
- `password`: String (hashé)
- `firstName`: String
- `lastName`: String
- `phone`: String (optionnel)
- `role`: UserRole (SELLER | MODERATOR | ADMIN)
- `isVip`: Boolean
- `isActive`: Boolean
- `forcePasswordChange`: Boolean

### Product (Produit)
- `id`: String (UUID)
- `title`: String
- `description`: String
- `price`: Float
- `status`: ProductStatus (PENDING | APPROVED | REJECTED | EXPIRED)
- `views`: Int
- `isVip`: Boolean
- `sellerId`: String (référence User)
- `categoryId`: String (référence Category)
- `publishedAt`: DateTime (optionnel)
- `photos`: Photo[]

### Category (Catégorie)
- `id`: String (UUID)
- `name`: String (unique)
- `description`: String (optionnel)
- `icon`: String (optionnel)
- `color`: String (optionnel)
- `isActive`: Boolean

### Photo
- `id`: String (UUID)
- `url`: String
- `publicId`: String (Cloudinary)
- `isPrimary`: Boolean
- `productId`: String (référence Product)

### Notification
- `id`: String (UUID)
- `type`: NotificationType
- `message`: String
- `userId`: String (optionnel, référence User)
- `recipientEmail`: String
- `productId`: String (optionnel)
- `isRead`: Boolean
- `sent`: Boolean
- `sentAt`: DateTime (optionnel)

## 🔐 Authentification et Autorisation

### Rôles Utilisateur

1. **SELLER** (Vendeur)
   - Peut créer et gérer ses propres produits
   - Accès limité aux fonctionnalités de base

2. **MODERATOR** (Modérateur)
   - Tous les droits du vendeur
   - Peut modérer les produits (approuver/rejeter)
   - Accès aux outils de modération

3. **ADMIN** (Administrateur)
   - Tous les droits du modérateur
   - Gestion complète des utilisateurs
   - Gestion des catégories
   - Suppression de produits

### JWT Tokens

Les tokens JWT sont utilisés pour l'authentification. Ils contiennent :
- `userId`: ID de l'utilisateur
- `email`: Email de l'utilisateur
- `role`: Rôle de l'utilisateur

## 📧 Système de Notifications

Le système envoie automatiquement des emails pour :

- **Confirmation de soumission** : Quand un vendeur soumet un produit
- **Approbation/Rejet** : Notification du statut de modération
- **Expiration** : Rappel avant expiration des produits
- **Expiration effective** : Quand un produit expire

Les notifications sont également stockées en base pour consultation dans l'interface.

## ⏰ Tâches Planifiées (Cron Jobs)

- **Expiration des produits** : Tous les jours à minuit, marque les produits de plus de 7 jours comme expirés
- **Notifications d'expiration** : Tous les jours, prévient les vendeurs dont les produits expirent dans 1 jour

## 🛡️ Sécurité

- **Validation des entrées** : Utilisation d'express-validator
- **Protection CORS** : Configuration restrictive des origines autorisées
- **Headers de sécurité** : Helmet pour sécuriser les headers HTTP
- **Authentification JWT** : Tokens sécurisés avec expiration
- **Hachage des mots de passe** : bcrypt avec 12 rounds
- **Contrôle d'accès** : Middleware RBAC (Role-Based Access Control)

## 📊 Base de Données

### Configuration Prisma

Le schéma utilise MySQL avec les optimisations suivantes :
- Indexes sur les champs fréquemment recherchés
- Relations optimisées
- Types de données appropriés

### Migrations

Les migrations sont gérées par Prisma :
```bash
npx prisma migrate dev --name description-de-la-migration
```

## 🚀 Déploiement

### Variables d'environnement de production

Assurez-vous de configurer correctement les variables d'environnement pour la production :

- `NODE_ENV=production`
- `DATABASE_URL` pointant vers la base MySQL de production
- `JWT_SECRET` fort et unique
- `CLOUDINARY_*` configurés pour le compte de production
- `EMAIL_*` configurés pour le service email de production

### Build et déploiement

```bash
# Build
npm run build

# Démarrer en production
npm start
```

### Health Check

L'endpoint `/health` permet de vérifier l'état du serveur :
```bash
curl http://localhost:3000/health
```

## 🧪 Tests

*(À implémenter)* Le projet est configuré pour les tests avec Jest et Playwright pour les tests E2E.

## 📝 Logs

Les logs sont écrits dans `backend.log` et incluent :
- Erreurs serveur
- Tentatives de connexion
- Actions de modération
- Uploads d'images

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

ISC

## 📞 Support

Pour toute question ou problème, veuillez contacter l'équipe de développement.
