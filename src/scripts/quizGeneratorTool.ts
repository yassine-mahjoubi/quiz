export const schema = {
  type: 'OBJECT',
  properties: {
    quiz: {
      type: 'OBJECT',
      description: "L'objet contenant le quiz généré.",
      properties: {
        tags: {
          type: 'ARRAY',
          description: 'trois tags pour identifier le sujet du quiz.',
          items: {
            type: 'STRING',
          },
        },
        quiz_questions: {
          type: 'ARRAY',
          description: 'Une liste de questions pour le quiz.',
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
                description:
                  "L'index (commençant à 0) de la bonne réponse dans le tableau 'choices'.",
              },
            },
            required: ['question_text', 'difficulty', 'choices', 'correct_answer_index'],
          },
        },
      },
      required: ['tags', 'quiz_questions'],
    },
    error: {
      type: 'STRING',
      description:
        "Un message d'erreur décrivant pourquoi le quiz n'a pas pu être généré. Ce champ ne doit être présent QUE si la génération a échoué.",
    },
  },
  oneOf: [{ required: ['quiz'] }, { required: ['error'] }],
}

export const quizGeneratorTool = {
  function_declarations: [
    {
      name: 'generateur_de_quiz',
      description: 'Génère un quiz ou retourne une erreur si un contexte  fourni est invalide.',
      parameters: schema,
    },
  ],
}
