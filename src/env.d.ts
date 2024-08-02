declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      DATABASE_URL: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
      GOOGLE_CALLBACK: string;
    }
  }
}
export {};
