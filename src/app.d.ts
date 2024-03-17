// See https://kit.svelte.dev/docs/types#app

import type { Post } from "@prisma/client";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    interface PageData {
      blogs?: Post[];
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
