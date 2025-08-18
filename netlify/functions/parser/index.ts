import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions'
// JSDOM : simule un environnement de navigateur prend html brut => object en créant un dom
import { JSDOM } from 'jsdom'

//filter brut html to essential content readable
import { Readability } from '@mozilla/readability'

// convert html to markdown
import TurndownService from 'turndown'

import fetch from 'node-fetch'

/**
 * @description Gère les requêtes pour analyser le contenu d'une page web externe.
 * Elle prend une URL en paramètre de requête, récupère le contenu HTML de cette URL,
 * et le renvoie.
 *
 * @param {HandlerEvent} event - L'objet contenant les détails de la requête HTTP entrante.
 * @param {HandlerContext} context - L'objet contenant des informations sur le contexte d'exécution.
 * @returns {Promise<HandlerResponse>} Un objet de réponse contenant le statut et le corps (body).
 */

export const getMarkdownFromUrl = async (url: string): Promise<string> => {
  // ERREUR :
  if (!url) {
    throw new Error('url manquante')
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Le site a répondu avec une erreur: ${response.statusText}`)
    }
    const html = await response.text()

    //create dom
    const dom = new JSDOM(html)
    const title = dom.window.document.title
    console.log('🚀 ~ handler ~ title:', title)

    //check Readability
    const reader = new Readability(dom.window.document)
    console.log('🚀 ~ handler ~ redear:', reader)

    // Readability d'analyser et d'extraire l'article
    const article = reader.parse()

    // check Readability a bien trouvé un article
    if (!article || !article.content) {
      throw new Error("Readability n'a pas pu extraire de contenu de la page.")
    }
    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(article.content)
    console.log('🚀 ~ handler ~ markdown:', markdown)

    return markdown

    /* return {
      statusCode: 200,
      body: JSON.stringify({
        success: `html okay longeurs : ${html.length} et voici le title: ${title}`,
      }),
    } */
    /* return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Article extrait avec succès !',
        title: article.title, // Le titre trouvé par Readability
        author: article.byline, // L'auteur, si trouvé
        length: article.length, // La longueur du contenu en caractères
        excerpt: article.excerpt, // Un court extrait généré automatiquement
        // La propriété la plus importante pour la suite est 'article.content'
        // qui contient le HTML propre de l'article.
      }),
    } */
  } catch (error) {
    console.log('erreur dans le bloc fetch', error)
    throw Error
    /* return {
      statusCode: 500, // 500 Internal Server Error
      body: JSON.stringify({
        error: `Impossible de récupérer le contenu de l'URL. Détail: ${error.message}`,
      }),
    } */
  }
}

const handler: Handler = async (
  event: HandlerEvent,
  _context: HandlerContext,
): Promise<HandlerResponse> => {
  // On récupère l'objet contenant tous les paramètres de la requête.
  const params = event.queryStringParameters
  const urlToFetch = params?.url
  if (!urlToFetch) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: `l'URL est null ou inexistante`,
      }),
    }
  }
  try {
    const markdown = await getMarkdownFromUrl(urlToFetch)
    return {
      statusCode: 200,
      body: markdown,
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500, // 500 Internal Server Error
      body: JSON.stringify({
        error: `Impossible de récupérer le contenu de l'URL. Détail: ${error}`,
      }),
    }
  }
}
// "handler" : C'est le nom que le système de Netlify recherche par défaut pour exécuter la fonction.
export { handler }
