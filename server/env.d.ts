declare namespace NodeJS {
    interface ProcessEnv {
        VAPID_PUBLIC_KEY: string;
        VAPID_PRIVATE_KEY: string;
        PORT: string;
        CLIENT_URL: string;
    }
  }