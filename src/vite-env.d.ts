/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional default To: address (e.g. facilities@company.com). Set in CI or .env as VITE_RESTOCK_MAIL_TO */
  readonly VITE_RESTOCK_MAIL_TO?: string
}
