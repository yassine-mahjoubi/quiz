import { isvalideUrl } from '@/utils/validateurl'

/**
 * useInputCheck() une première vérification de la value avant d'appeler isvalideUrl()
 * @param {sting} value - la value de l'input to check
 * @returns {boolean} tru si l'url est valide
 */
export const useInputCheck = (value: string): boolean => {
  if (value === '' || value.length < 6) {
    return false
  } else {
    return isvalideUrl(value)
  }
}
