import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.DB_KEY

export const database = createClient(supabaseUrl, supabaseKey)