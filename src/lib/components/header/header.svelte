<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { cn } from "@/lib/utils.js";
  import { HamburgerMenu } from "svelte-radix";
  import { Button } from "../ui/button";
  import Brand from "./brand.svelte";
  import DarkModeButton from "./dark-mode-button.svelte";
  import NavItem from "./nav-item.svelte";
  import Searchbar from "./searchbar.svelte";

  const navItems = [
    { name: "Post", href: "/post" },
    { name: "Tag", href: "/tag" },
    { name: "Stack", href: "/stack" },
  ];
  let isCollapse = false;
  let lastPath = "";
  let nowPath = $page.url.pathname;

  $: if (browser) {
    window.addEventListener("resize", (_) => {
      if (window.innerWidth >= 768) {
        isCollapse = false;
      } else {
        window.removeEventListener("resize", (_) => (isCollapse = false));
      }
    });
  }
</script>

<header>
  <nav class={cn("container flex justify-between")}>
    <div class="flex items-center justify-between w-full gap-2 mt-4 md:w-fit">
      <a href="/" class="flex items-center justify-between gap-2"> <Brand /></a>
      <Button
        variant="ghost"
        class="p-2 md:hidden"
        on:click={() => (isCollapse = !isCollapse)}
      >
        <HamburgerMenu />
      </Button>
    </div>
    <div class="hidden mt-4 md:flex">
      <ul class="flex flex-col gap-2 md:flex-row lg:gap-4">
        {#each navItems as { name, href }}
          <li>
            <NavItem {href}><h2>{name}</h2></NavItem>
          </li>
        {/each}
      </ul>
    </div>
    <div class="items-center hidden gap-2 mt-4 md:flex">
      <Searchbar />
      <DarkModeButton />
    </div>
  </nav>
  <nav class="container">
    {#if isCollapse}
      <div class="items-center gap-2 md:hidden">
        {#each navItems as { name, href }}
          <NavItem {href}><h2>{name}</h2></NavItem>
        {/each}
      </div>

      <div class="flex items-center w-full gap-2 mt-4">
        <Searchbar className="w-full" />
        <DarkModeButton />
      </div>
    {/if}
  </nav>
</header>
