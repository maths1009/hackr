
# 🛠️ HackR - API de Hacking

Bienvenue dans le projet **HackR**, une API qui met à disposition des outils de hacking pour l'éducation et la démonstration de tests de sécurité. Ce projet est développé avec TypeScript et Express, et inclut plusieurs fonctionnalités de hacking ainsi que des mesures de sécurité intégrées.

## 📑 Sommaire
- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Pré-requis](#pré-requis)
- [Installation](#installation)
- [Base de données](#base-de-données)
- [Scripts Disponibles](#scripts-disponibles)
- [Structure du Projet](#structure-du-projet)
- [Swagger Documentation](#swagger-documentation)
- [Utilisation](#utilisation)
- [Contribution](#contribution)
- [Licence](#licence)

## 🎯 Fonctionnalités
L'API HackR offre les fonctionnalités suivantes :
- 🔍 **Vérification d'existence d'une adresse mail**
- ✉️ **Spammer de mail** (contenu + nombre d'envoi)
- 🎣 **Service de phishing** (création d'une page web sur mesure avec IA)
- 🔒 **Vérification de la sécurité de mots de passe** (comparaison avec les mots de passe les plus courants)
- 🌐 **Récupération de domaines et sous-domaines** associés à un Nom De Domaine
- 🛡️ **DDoS**
- 🖼️ **Changement d'image aléatoire** via une API tierce
- 📇 **Génération d'identité fictive**
- 🕵️ **Crawler d'information** sur une personne (à partir d'un nom/prénom)
- 🔑 **Générateur de mots de passe sécurisé**

## 🔧 Technologies Utilisées
Le projet utilise les technologies suivantes :
- **TypeScript** pour un typage statique sûr.
- **Express** comme framework backend.
- **Zod** pour la validation des schémas et la génération de documentation avec @asteasolutions/zod-to-openapi.
- **Swagger** pour la documentation de l'API.
- **Vitest** pour les tests.
- **Husky** pour les hooks Git.
- **dotenv** pour la gestion des variables d'environnement.
- **pino** pour le logging.
- **helmet** pour la sécurité HTTP.
- **express-rate-limit** pour la limitation de débit.
- **prisma** pour l'ORM et la gestion de la base de données.

## 📝 Pré-requis
Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (>= 22.9.0)
- **npm** (>= 10.8.2)

## 🚀 Installation
### 1. Cloner le dépôt
```bash
git clone https://gitlab.com/api347245/hackr.git
cd hackr
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
Renommez le fichier `.env.template` à la racine du projet en `.env` et configurez les variables d'environnement nécessaires :
```bash
mv .env.sample .env
```

### 4. Compilation et Démarrage
- En mode développement :
```bash
npm run dev
```

- Pour une version de production :
```bash
npm run build
npm start
```

### 5. Base de Données
Pour utiliser la base de données, vous devez configurer les variables d'environnement suivantes :
```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Demarer la base de données avec Docker :
```bash
npm run db:start
```

Executer une premiere requête pour initialiser les logs

Aller sur ce lien http://localhost:5601/app/management/kibana/indexPatterns pour créer un nouvelle index, cliquer sur le lien pour créer un index 

Donner lui un nom puis rentrer ceci dans Custom index pattern ID
```pino-logs```
Selectionner un Timestamp field puis créer votre key, une fois fait créer votre vue pour voir vos logs


## 📦 Base de Données
### Utilisation de Docker pour le Développement Local

Pour faciliter le développement local, vous pouvez utiliser Docker et `docker-compose`. Voici les étapes à suivre :

### 1. Démarrer les services de Base de Données
```bash
npm run db:start
```

### 2. Arrêter les services de Base de Données
```bash
npm run db:stop
```



## 📜 Scripts Disponibles
Le `package.json` définit plusieurs scripts pour faciliter le développement et le déploiement de l'API :
- **`npm run dev`** : Démarrer l'application en mode développement avec rechargement automatique.
- **`npm run build`** : Compiler le projet TypeScript en JavaScript.
- **`npm run bd:start`** : Démarrer la base de données PostgreSQL avec Docker.
- **`npm run bd:stop`** : Arrêter la base de données PostgreSQL avec Docker.
- **`npm start`** : Démarrer l'application compilée en mode production.
- **`npm run lint`** : Lancer l'analyse du code avec ESLint.
- **`npm run lint:fix`** : Corriger automatiquement les erreurs ESLint.
- **`npm run format`** : Formater le code avec Prettier.
- **`npm run test`** : Exécuter les tests unitaires avec Vitest.
- **`npm run clean`** : Supprimer les fichiers de compilation et de couverture de test.

## 📖 Swagger Documentation
Pour consulter la documentation interactive de l'API, démarrez le projet et accédez à :
```
http://localhost:3000/api-docs
```

## 🚀 Utilisation
### Routes Disponibles
L'API expose plusieurs routes, par exemple :
- **POST /auth/login** : Connexion et récupération de JWT.
- **POST /auth/register** : Inscription d'un nouvel utilisateur.
