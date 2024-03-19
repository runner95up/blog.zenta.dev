<script lang="ts">
  export let searchResults: any;
</script>

{#if searchResults.length > 0}
  <div
    class="absolute left-0 z-10 w-full p-2 mt-3 text-black border rounded-md shadow-lg dark:border-shark-600 border-athens-600 top-full dark:text-white bg-athens-50 dark:bg-shark-950 dark:hover:border-shark-400 hover:border-athens-400"
  >
    <ul role="list">
      {#each searchResults as result}
        <li class="p-2 rounded-md dark:hover:bg-shark-900 hover:bg-athens-900">
          <button> {result.title}</button>
        </li>
      {/each}
    </ul>
  </div>
{/if}
