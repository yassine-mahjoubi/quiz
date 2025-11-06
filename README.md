# AI Quiz Generator - Intelligent Learning Assistant

![Status](https://img.shields.io/badge/Status-En%20Développement-yellow)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)
![RAG](https://img.shields.io/badge/RAG-Enabled-purple)

** Projet en cours de développement**

# AI Quiz Generator

Une app qui génère des quiz personnalisés en utilisant l'Intelligence Artificielle. L'application peut créer des quiz sur n'importe quel sujet en analysant du contenu web fourni ou pas par l'utilisateur.

Ce projet démontre l'intégration avancée d'APIs d'IA et de techniques de **Retrieval-Augmented Generation (RAG)** dans une application Vue 3.

## Fonctionnalités Clés

- **Génération de Quiz IA :** Quiz personnalisés générés par Google Gemini sur n'importe quel sujet
- **RAG Intelligent :** Analyse automatique du contenu web via URL pour limiter le contexte
- **Scraping Adaptatif :**
  - Solution primaire avec **Jina AI Reader API** pour extraction optimisée
  - Fallback automatique vers solution **homemade (jsdom)** si Jina n'est pas disponible ou out of tokens
- **Feedback Transparent :** Indication à l'utilisateur de la méthode utilisée (Jina ou solution homemade)
- **Interface Accessible :** Interface responsive et accessible (en cours d'amélioration RGAA)
- ** Important :** L'IA peut commettre des erreurs

## État d'Avancement

⚠️ PROJET EN DÉVELOPPEMENT ACTIF - Certaines fonctionnalités sont encore en implémentation.

### Fonctionnalités implémentées :

- ✅ Intégration API Gemini
- ✅ Pipeline pseudo RAG avec Jina Reader
- ✅ Fallback scraping avec jsdom et readability
- ✅ analyse si le sujet donné match avec l'url fourni
- ✅ Interface de quiz interactive accessible

### En cours de développement :

- 🔄 Conformité RGAA complète pour l'accessibilité
- ❌ Tests unitaires (pas encore implémentés)

## 🛠️ Stack Technique

- **Framework :** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **CSS Framework :** [Pico.css](https://picocss.com/) (pour un style sémantique et léger)
- **APIs & Services IA :**
  - [Google Gemini](https://ai.google.dev/) pour la génération de quiz
  - [Jina AI Reader](https://jina.ai/reader/) pour l'extraction de contenu web (RAG)
- **Scraping de secours :** jsdom pour parsing HTML/DOM
- **Build Tool :** [Vite](https://vitejs.dev/)
- **Tests :** [Vitest](https://vitest.dev/)
- **Qualité de code :** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Objectifs du Projet

Ce projet est un cas pratique pour maîtriser les concepts suivants :

1. **Implémenter un pipeline pseudo RAG :** Extraction et analyse de contenu web pour alimenter l'IA en limitant le contexte
2. **Maîtriser les APIs d'IA :** Intégration avec Google Gemini
3. **Robustesse et Fallback :** Système de secours automatique entre différentes solutions de scraping
4. **Architecture Résiliente :** Gestion transparente des échecs d'API et alternatives
5. **Développement Vue 3 Moderne :** TypeScript, Composition API, et "bonnes pratiques"

## Avertissement Important

**L'Intelligence Artificielle peut commettre des erreurs !**

- Les quiz générés par Gemini peuvent contenir des inexactitudes
- Les réponses suggérées ne sont pas toujours correctes à 100%
- **Toujours vérifier** les informations avec des sources fiables

## Comment ça Marche

1.  **Saisie Utilisateur :** L'utilisateur fournit une URL et, optionnellement, un sujet précis.
2.  **Extraction du Contenu :**
    *   Tentative via **Jina AI Reader** (solution optimisée).
    *   Si échec → Basculement automatique vers la solution interne (**jsdom** + **readability**).
3.  **Traitement RAG :** Le contenu extrait est nettoyé et converti au format Markdown, prêt pour l'IA.
4.  **Vérification de Pertinence (si un sujet est fourni) :**
    *   Le système vérifie si le sujet est présent dans le contenu extrait.
    *   Si le sujet n'est pas trouvé, un message informe l'utilisateur que le contenu ne correspond pas au sujet demandé.
    *   Le processus continue uniquement si le sujet est trouvé (ou si aucun sujet n'a été fourni).
5.  **Génération IA :** Google Gemini crée le quiz en se basant sur le contenu pertinent.
6.  **Feedback Transparent :** L'interface indique à l'utilisateur la méthode d'extraction qui a été utilisée.

## Installation et Lancement

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/yassine-mahjoubi/quiz.git
   ```

2. **Accédez au dossier du projet :**

   ```bash
   cd quiz
   ```

3. **Installez les dépendances :**

   ```bash
   npm install
   ```

4. **Configurez les clés d'API :**
   Commencez par copier le fichier d'exemple pour créer votre propre fichier d'environnement local :

   ```bash
   cp .env.example .env.local
   ```

   Ensuite, ouvrez le nouveau fichier `.env.local` et remplissez les variables avec vos clés d'API personnelles :

   ```env
   # .env.local
   VITE_KEY_GEMINI_API_KEY=VOTRE_CLE_PERSONNELLE_GEMINI
   VITE_JINA_API_KEY=VOTRE_CLE_PERSONNELLE_JINA
   ```

5. **Lancez le serveur de développement :**
   ```bash
   npm run dev
   ```

## Scripts Disponibles

- `npm run dev`: Lance le serveur de développement
- `npm run build`: Compile l'application pour la production
- `npm run test:unit`: ⚠️ Tests unitaires (pas encore implémentés)
- `npm run lint`: Analyse le code pour trouver les problèmes de style

## Cas d'Usage

- **Auto-apprentissage :** Quiz personnalisés sur n'importe quel sujet web

---
