/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESTOCK_MAIL_TO?: string
  /** Formspree form id from dashboard URL https://formspree.io/f/YOUR_ID */
  readonly VITE_FORMSPREE_FORM_ID?: string
  /**
   * Optional valid email for Formspree `email` field (reply-to).
   * Some Formspree settings work better with this set (e.g. shared facilities inbox).
   */
  readonly VITE_FORMSPREE_REPLY_EMAIL?: string
}
