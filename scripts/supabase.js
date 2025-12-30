import { createClient } from "https://esm.run/@supabase/supabase-js@2";

const supabase_url = `https://xnfmgcnmdscyyaytacgp.supabase.co`;
const supabase_key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuZm1nY25tZHNjeXlheXRhY2dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODkyMTIsImV4cCI6MjA2ODg2NTIxMn0.pY02zXDHqGpauVf1iTaiRsOl1i-K6upjWc9NMQmdSjM`;

export const supabase = createClient(supabase_url, supabase_key);