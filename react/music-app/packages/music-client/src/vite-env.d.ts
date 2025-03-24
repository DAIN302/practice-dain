/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
