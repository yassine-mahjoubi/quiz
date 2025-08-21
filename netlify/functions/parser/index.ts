import type { Handler, HandlerEvent, HandlerContext, HandlerResponse } from '@netlify/functions'
// JSDOM : simule un environnement de navigateur prend html brut => object en créant un dom
import { JSDOM } from 'jsdom'

// filter brut html to essential content readable
import { Readability } from '@mozilla/readability'

// convert html to markdown
import TurndownService from 'turndown'

import fetch from 'node-fetch'

/**
  * @description Récupère le contenu d'une URL, extrait le contenu principal et le convertit en Markdown.
  * Gère les erreurs de récupération ou de parsing en retournant une chaîne vide.
  * @param {string} url L'URL complète de la page web à analyser.
  * @returns {Promise<string>} Une promesse qui se résout avec le contenu en Markdown, ou une chaîne vide en cas
 d'erreur.
  * @throws {Error} Lance une erreur si le paramètre URL est manquant, qui sera interceptée par le handler.
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

    // create dom Configuration JSDOM optimisée pour éviter l'erreur xhr-sync-worker
    const dom = new JSDOM(html, {
      url: url,
      resources: 'usable',
      runScripts: 'outside-only', // 'dangerously'
      pretendToBeVisual: false,
    })

    // Vérification que le document a été créé
    if (!dom.window.document) {
      throw new Error('Impossible de créer le DOM à partir du HTML')
    }

    //check Readability
    const reader = new Readability(dom.window.document)

    // Readability d'analyser et d'extraire l'article
    const article = reader.parse()

    // check Readability a bien trouvé un article
    if (!article || !article.content) {
      throw new Error("Readability n'a pas pu extraire de contenu de la page.")
    }
    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(article.content)

    return markdown
  } catch (error) {
    console.log('erreur dans le bloc fetch', error)
    return ''
  }
}

/**
 * @description Gère les requêtes pour la fonction Netlify. Elle prend une URL via les paramètres de requête,
 * appelle getMarkdownFromUrl pour obtenir le contenu en Markdown, et le renvoie dans une réponse HTTP.
 * @param {HandlerEvent} event L'objet d'événement de Netlify contenant les détails de la requête, y compris les
`queryStringParameters`.
 * @param {HandlerContext} _context Le contexte d'exécution de Netlify (non utilisé ici).
 * @returns {Promise<HandlerResponse>} Un objet de réponse HTTP avec le statut (200, 400, ou 500) et le corps de
la réponse.
 */

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
