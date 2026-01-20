export const copyData = (element: string) => {
  try {
    navigator.clipboard.writeText(element)
  } catch (error) {
    console.log(error)
  }
}
