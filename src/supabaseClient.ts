import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabase_publicKey = import.meta.env.VITE_SUPABASE_PUBLICKEY!

const supabase = createClient(supabaseUrl, supabase_publicKey)
export default supabase