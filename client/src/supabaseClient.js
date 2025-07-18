import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://kyvmedshzndnlxocygdp.supabase.co'; // ton URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5dm1lZHNoem5kbmx4b2N5Z2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzUwNTUsImV4cCI6MjA2ODM1MTA1NX0.u5zR4g-v8iUIvFA0UQLBsIba2aihOdjAgHCMj71IX10'; // ta clé publique (anon)
export const supabase = createClient(supabaseUrl, supabaseKey);