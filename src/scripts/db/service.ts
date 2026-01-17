//Import supabase
import { supabase } from './index'
const getallJson = async () => {
  try {
    const { data: ai_quiz_generations, error } = await supabase
      .from('ai_quiz_generations')
      .select('quiz_json')
    if (error) throw new Error('erreur supabase')
    return ai_quiz_generations
  } catch (error) {
    console.log(error)
  }
}
export default getallJson
