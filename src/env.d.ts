declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;

      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      GOOGLE_CALLBACK: string;

      DATABASE_URL: string;

      ACCESS_TOKEN_SECRET: string;
    }
  }
}
export {};
