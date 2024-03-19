<script lang="ts">
  import { page } from "$app/stores";
  import { cn } from "$lib/utils.js.js";
  import Button from "../ui/button/button.svelte";

  export let href: string = "";
  export let className: string = "";

  $: active = href === $page.url.pathname;
  $: console.log($page.url.pathname);
</script>

<Button
  {...$$props}
  {href}
  variant="ghost"
  class={cn(
    "flex p-2 gap-2 items-start",
    active && "underline underline-offset-8 text-emerald-500 font-bold",
    className,
  )}
>
  <slot />
</Button>
