import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://icdcxjacqzchbqookqqg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljZGN4amFjcXpjaGJxb29rcXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMjIwMzEsImV4cCI6MjAwNTg5ODAzMX0.vTwegb3H9I2kx4LCXP5xI2MzCrTFwggiE3AssA4qWwc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
