/**
 * getDuration() - calcul la durée entre date début donné(startDate) et maintenant
 * @param startDate {number} - timeStamp de début en ms
 * @returns duration {number} - la durée écoulée en ms
 */
export const getDuration = (startDate: number): number => {
  const duration = Date.now() - startDate
  return duration
}

/**
 * formatDurationToSeconds() formate une duration donnée en ms en string
 * @param duration {number} - durée donnée en ms
 * @returns {string} - durée formaté exemple ("2.25s")
 */
export const formatDurationToSeconds = (duration: number): string => {
  return (duration / 1000).toFixed(2) + 's'
}

export const formatDate = (stamp: string, locale: string) => {
  return new Date(stamp).toLocaleDateString(locale)
}
