declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      SUPABASE_URL: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
    }
  }
}
export {};
