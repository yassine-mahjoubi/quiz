# Quiz RGAA 4.2 - Assistant d'Accessibilité

![Status](https://img.shields.io/badge/Status-En%20Développement-yellow)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)

**🚧 Projet en cours de développement**

# Quiz RGAA 4.2 - Assistant d'Accessibilité

Une application web conçue pour être un outil d'apprentissage et de révision sur le **Référentiel Général d'Amélioration de l'Accessibilité (RGAA) version 4.2**.

Ce projet a un double objectif :

1.  **Construire un assistant pertinent** pour les développeurs, designers et auditeurs en accessibilité web.
2.  **Servir de cas pratique** pour l'intégration d'APIs d'Intelligence Artificielle (Gemini) et de techniques de RAG (Retrieval-Augmented Generation) dans une application Vue 3 moderne.

L'application elle-même se doit d'être un exemple de respect des bonnes pratiques d'accessibilité qu'elle promeut.

## ✨ Fonctionnalités Clés

- **Génération de Quiz sur le RGAA 4.2 :** Des questions précises générées à la volée sur les critères et tests du référentiel.
- **Retrieval-Augmented Generation (RAG) :** L'API Gemini ne répond qu'en se basant sur le contenu du [référentiel officiel du RGAA](https://accessibilite.numerique.gouv.fr/), fourni via l'API Jina Reader, garantissant des réponses factuelles et à jour.
- **Interface Accessible :** Le projet est une démonstration pratique des principes du RGAA, offrant une expérience utilisateur inclusive.
- **Validation des Réponses :** Retour immédiat pour un apprentissage efficace.

## 🚧 État d'Avancement

⚠️ PROJET EN DÉVELOPPEMENT ACTIF - Certaines fonctionnalités sont encore en implémentation.

### En cours de développement :

- 🔄 Intégration API Gemini

- 🔄 Pipeline RAG avec Jina Reader

- 🔄 Interface de quiz interactive

- 📋 Tests unitaires complets

## 🛠️ Stack Technique

- **Framework :** [Vue.js 3](https://vuejs.org/) (Composition API)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **CSS Framework :** [Pico.css](https://picocss.com/) (pour un style sémantique et léger)
- **APIs & Services IA :**
  - [Google Gemini](https://ai.google.dev/) pour la génération de contenu.
  - [Jina AI Reader](https://jina.ai/reader/) pour l'extraction de contexte (RAG).
- **Build Tool :** [Vite](https://vitejs.dev/)
- **Tests :** [Vitest](https://vitest.dev/)
- **Qualité de code :** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## 🎯 Objectifs du Projet

Ce projet est un cas pratique pour maîtriser les concepts suivants :

1.  **Implémenter un pipeline RAG :** Fournir un contexte spécifique (le RGAA) à un grand modèle de langage (Gemini) pour obtenir des réponses précises et fiables.
2.  **Maîtriser une API d'IA :** Interagir de manière efficace avec l'API Gemini.
3.  **Accessibilité en Pratique :** Appliquer concrètement les critères du RGAA dans une application web moderne.
4.  **Développement Vue 3 Robuste :** Mettre en œuvre les principes de refactorisation, le typage fort avec TypeScript et les tests unitaires dans un projet à forte valeur ajoutée.

## 🚀 Installation et Lancement

1.  **Clonez le dépôt :**
    ```bash
    git clone <https://github.com/yassine-mahjoubi/quiz.git>
    ```
2.  **Accédez au dossier du projet :**
    ```bash
    cd quiz
    ```
3.  **Installez les dépendances :**
    ```bash
    npm install
    ```
4.  **Configurez les clés d'API :**
    Commencez par copier le fichier d'exemple pour créer votre propre fichier d'environnement local :

    ```bash
    cp .env.example .env.local
    ```

    Ensuite, ouvrez le nouveau fichier `.env.local` et remplissez les variables avec vos clés d'API personnelles.

    ```env
    # .env.local
    VITE_KEY_GEMINI_API_KEY=VOTRE_CLE_PERSONNELLE_GEMINI
    VITE_JINA_API_KEY=VOTRE_CLE_PERSONNELLE_JINA
    ```

5.  **Lancez le serveur de développement :**
    ```bash
    npm run dev
    ```

## 📜 Scripts Disponibles

- `npm run dev`: Lance le serveur de développement.
- `npm run build`: Compile l'application pour la production.
- `npm run test:unit`: Exécute les tests unitaires.
- `npm run lint`: Analyse le code pour trouver les problèmes de style.
