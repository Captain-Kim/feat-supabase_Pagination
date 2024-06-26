import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kmfvncclriiektxphias.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZnZuY2NscmlpZWt0eHBoaWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1OTkzOTgsImV4cCI6MjAzNDE3NTM5OH0.RmzkLqPqKZ2BV-HuiaBTdS2MANfpufmEhCwX4n1lZEg'
export const supabase = createClient(supabaseUrl, supabaseKey)