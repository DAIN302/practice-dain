/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_GOOGLE_MAPS_API_KEY: string;
}
  
interface ImportMeta {
  env: ImportMetaEnv;
}
