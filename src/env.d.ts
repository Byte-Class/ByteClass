declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      CONNECTION_URL_POSTGRES: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
      GOOGLE_CALLBACK: string;
    }
  }
}
export {};
