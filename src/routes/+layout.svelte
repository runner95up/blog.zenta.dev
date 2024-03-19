<script lang="ts">
  import { dev } from "$app/environment";
  import Header from "@/lib/components/header/header.svelte";
  import { partytownSnippet } from "@builder.io/partytown/integration";
  import { inject } from "@vercel/analytics";
  import "iconify-icon";
  import { ModeWatcher } from "mode-watcher";
  import "../app.pcss";

  inject({ mode: dev ? "development" : "production" });
</script>

<svelte:head>
  <script>
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

<Header />
<ModeWatcher />
<slot />
