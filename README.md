# 🛠️ HackR - API de Hacking

Bienvenue dans le projet **HackR**, une API qui met à disposition des outils de hacking pour l'éducation et la démonstration de tests de sécurité. Ce projet est développé avec TypeScript et Express, et inclut plusieurs fonctionnalités de hacking ainsi que des mesures de sécurité intégrées.

## 📋 Table des Matières

### 🚀 Démarrage Rapide
- [Pré-requis](#-pré-requis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)

### 💻 Architecture & Développement
- [Technologies Utilisées](#-technologies-utilisées)
- [Base de données](#-base-de-données)
- [Monitoring & Logs](#-monitoring-et-logs)

### 📚 Documentation
- [Documentation API](#-documentation-api)

### 🔧 Qualité & Tests
- [Validation des Données](#-validation-des-données)
- [Tests Unitaires](#-tests)
- [Linting & Formatage](#-linting-et-formatage)
- [Hooks Git](#-hooks-git)

### 🔄 CI/CD & Déploiement
- [Pipeline GitLab CI/CD](#-intégration-continue)
- [Environnements](#-environnements)

### 🛟 Support
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)
- [Arrêt des Services](#-arrêt-des-services)

## 🚀 Démarrage Rapide

### 📋 Pré-requis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (>= 22.9.0)
- **npm** (>= 10.8.2)
- **Docker** et **Docker Compose**

#### Installation de Docker

1. **Windows** :
   - Téléchargez [Docker Desktop pour Windows](https://docs.docker.com/desktop/install/windows-install/)
   - Suivez l'assistant d'installation
   - Activez WSL 2 si demandé

2. **macOS** :
   - Téléchargez [Docker Desktop pour Mac](https://docs.docker.com/desktop/install/mac-install/)
   - Déplacez Docker dans votre dossier Applications
   - Lancez Docker et suivez les instructions

3. **Linux** :
```bash
# Debian/Ubuntu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Vérifiez l'installation
docker --version
docker-compose --version
```

### 🔧 Installation

1. **Cloner le dépôt**
```bash
git clone https://gitlab.com/api347245/hackr.git
cd hackr
```

2. **Installer les dépendances**
```bash
npm install
```

### ⚙️ Configuration

**Configuration de l'environnement**
```bash
mv .env.sample .env
```

### 🏃 Démarrage

```bash
# En développement - démarrage automatique avec Docker
npm run dev

# En production
npm run build
npm start
```

## 💻 Architecture & Développement

### 🛠️ Technologies Utilisées

- **Backend** :
  - TypeScript
  - Express.js
  - Node.js
- **Base de données** :
  - MariaDB
  - Prisma
- **Documentation** :
  - OpenAPI (Swagger)
  - @asteasolutions/zod-to-openapi
- **Tests & Qualité** :
  - Vitest
  - ESLint
  - Prettier
  - Husky

### 💾 Base de Données

Le projet utilise **MariaDB** comme système de gestion de base de données :

- Base de données automatiquement initialisée au démarrage
- Interface **phpMyAdmin** disponible :
  - URL : `http://localhost:8080`
  - Identifiants : définis dans le fichier `.env`

### 📊 Monitoring et Logs

Stack ELK pré-configuré :
- Collecte automatique des logs
- Dashboard Kibana personnalisé
- Alertes configurables

## 📚 Documentation

### 📖 Documentation API

La documentation complète de l'API est disponible via Swagger UI :
- URL : `http://localhost:3000/api-docs`
- Documentation générée automatiquement via zod-to-openapi
- Interface interactive pour tester les endpoints

## 🔧 Qualité & Tests

### ✅ Validation des Données

Utilisation de **Zod** pour la validation :
```typescript
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### 🧪 Tests

Tests unitaires avec **Vitest** :
```bash
# Lancer les tests
npm run test

# Avec couverture
npm run test:coverage
```

### 🎨 Linting et Formatage

Outils de qualité de code :
- ESLint
- Prettier
- TypeScript
- Sheriff

### 🪝 Hooks Git

Vérifications automatiques avec Husky :
```bash
# Pré-commit hooks
npm run lint
npm run format
npm run typecheck
npm run sherif
```

## 🔄 Intégration Continue

### 🔄 Pipeline GitLab CI/CD

Étapes automatisées :
1. Installation
2. Lint & Format
3. Tests
4. Build
5. Déploiement

### 🌍 Environnements

- **Development** : `develop` branch
- **Production** : `main` branch

## 🛟 Support

### ❓ Troubleshooting

Solutions aux problèmes courants :
- Erreurs de démarrage
- Problèmes de connexion
- Erreurs de build

### 📋 FAQ

Questions fréquemment posées et leurs réponses.

### 🛑 Arrêt des Services

```bash
# Arrêter l'application
Ctrl+C

# Arrêter et supprimer les conteneurs Docker
npm run db:stop
```