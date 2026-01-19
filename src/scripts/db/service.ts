import { supabase } from './index'

const getQuizJson = async () => {
  try {
    const { data: ai_quiz_generations, error } = await supabase
      .from('ai_quiz_generations')
      .select('*')
    if (error) throw new Error('error supabase')
    console.log(ai_quiz_generations)
    return ai_quiz_generations
  } catch (error) {
    console.log(error)
  }
}
export default getQuizJson
