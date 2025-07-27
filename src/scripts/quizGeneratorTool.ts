export const schema = {
  type: 'OBJECT',
  // Définition des propriétés de l'objet principal
  properties: {
    // La propriété principale est un tableau de questions
    quiz_questions: {
      type: 'ARRAY',
      description: 'Une liste de questions pour le quiz.',
      // Définition de la structure de chaque objet DANS le tableau
      items: {
        type: 'OBJECT',
        properties: {
          question_text: {
            type: 'STRING',
            description: 'Le texte de la question.',
          },
          category: {
            type: 'STRING',
            description: "La catégorie de la question (ex: 'Histoire', 'Science').",
          },
          difficulty: {
            type: 'STRING',
            description: 'Le niveau de difficulté de la question.',
            // On peut même contraindre les valeurs possibles
            enum: ['Facile', 'Moyen', 'Difficile'],
          },
          choices: {
            type: 'ARRAY',
            description:
              'Le tableau contenant toutes les réponses possibles (la bonne et les mauvaises).',
            items: {
              type: 'STRING',
            },
          },
          correct_answer_index: {
            type: 'INTEGER',
            description: "L'index (commençant à 0) de la bonne réponse dans le tableau 'choices'.",
          },
        },
        // On spécifie que tous ces champs sont obligatoires pour chaque question
        required: ['question_text', 'difficulty', 'choices', 'correct_answer_index'],
      },
    },
  },
  // L'objet principal doit obligatoirement contenir le tableau de questions
  required: ['quiz_questions'],
}

export const quizGeneratorTool = {
  function_declarations: [
    {
      name: 'generateur_de_quiz',
      description: 'quiz multilangue',
      parameters: schema,
    },
  ],
}
