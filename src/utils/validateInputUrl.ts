import { isvalideUrl } from '@/utils/validateurl'

/**
 * useInputCheck() une première vérification de la value avant d'appeler isvalideUrl()
 * @param {string} value - la value de l'input to check
 * @returns {boolean} true si l'url est valide
 */
export const useInputCheck = (value: string): boolean => {
  return value.length >= 11 && isvalideUrl(value)
}
