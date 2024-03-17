<script lang="ts">
  import { dev } from "$app/environment";
  import { partytownSnippet } from "@builder.io/partytown/integration";
  import { inject } from "@vercel/analytics";
  import "iconify-icon";
  import { ModeWatcher } from "mode-watcher";
  import "../app.pcss";

  inject({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
  <script>
    // Forward the necessary functions to the web worker layer
    partytown = {
      forward: ["dataLayer.push"],
    };
  </script>

  {@html "<script>" + partytownSnippet() + "</script>"}

  <script
    type="text/partytown"
    src="https://www.googletagmanager.com/gtag/js?id=G-NZWQBQDRGP"
  ></script>
  <script type="text/partytown">
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-NZWQBQDRGP");
    
  </script>
</svelte:head>

<ModeWatcher />
<slot />
