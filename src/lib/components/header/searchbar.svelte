<script lang="ts">
  import { Input } from "$c/ui/input";
  import { Separator } from "$c/ui/separator";
  import { cn, debounce } from "@/lib/utils.js";
  import type { Post } from "@prisma/client";
  import { MagnifyingGlass } from "svelte-radix";
  import SearchResult from "./search-result.svelte";

  let isLoading = false;
  let searchResults: Post[] = [];
  export let className = "";

  const debouncedSearch = debounce(handleSearch, 1000);

  async function handleSearch(e: any) {
    const query = e.target.value;
    if (query === "") {
      searchResults = [];
      isLoading = false;
      return;
    }
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    if (!data) {
      searchResults = [];
      isLoading = false;
      return;
    }
    searchResults = data;

    console.log(searchResults);
    isLoading = false;
  }
</script>

<div
  class={cn(
    "relative flex rounded-lg border border-input bg-transparent text-sm text-input shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder focus-within:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-athens-50 dark:bg-shark-950 h-full",
    className,
  )}
>
  {#if !isLoading}
    <MagnifyingGlass class="m-auto mx-2 text-2xl text-black dark:text-white" />
  {:else}
    <iconify-icon
      icon="mingcute:loading-3-fill"
      class="m-auto mx-2 text-2xl text-black dark:text-white animate-spin"
    />
  {/if}
  <Separator
    orientation="vertical"
    class="h-6 m-auto bg-athens-400 dark:bg-shark-700"
  />
  <Input
    class="text-black dark:text-white border-none focus-visible:ring-0 w-full rounded-bl-lg rounded-tl-lg border-0 py-2.5 pl-3 outline-none"
    on:input={(e) => {
      isLoading = true;
      debouncedSearch(e);
    }}
  />
  <SearchResult {searchResults} />
</div>
