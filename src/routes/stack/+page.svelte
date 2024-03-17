<script lang="ts">
  import { PUBLIC_DOMAIN, PUBLIC_NAME } from "$env/static/public";
  import * as Card from "$lib/components/ui/card";
  import Separator from "@/lib/components/ui/separator/separator.svelte";
  import SvelteSeo from "@/lib/svelte-seo";
  import { Image } from "@unpic/svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="container">
  <h1 class="my-8 text-2xl font-semibold">Stack</h1>
  <div class="grid grid-cols-4 gap-4">
    {#each data.stacks as stack}
      <Card.Root>
        <a href={`/stack/${stack.id}`}>
          <Image
            src={stack.logo ?? "https://via.placeholder.com/800x600"}
            layout="constrained"
            width={512}
            height={360}
            alt={stack.name}
            class="rounded-lg"
          />
        </a>
        <a
          href={stack.url}
          class="flex gap-2 p-2 m-2 mx-4 bg-blue-900 rounded-lg w-min"
          target="_blank"
        >
          <Card.Title>{stack.name}</Card.Title>
          <iconify-icon
            icon="streamline:interface-arrows-bend-up-right-2-arrow-bend-curve-change-direction-up-to-right"
          ></iconify-icon>
        </a>

        <Separator class="w-[calc(100%-2rem)] mx-auto" />

        <a href={`/stack/${stack.id}`}>
          <Card.Content class="mt-8">
            <Card.Title>{stack.name}</Card.Title>
            <Card.Description class="mt-2 line-clamp-3"
              >{stack.description}</Card.Description
            >
          </Card.Content>
        </a>
      </Card.Root>
    {/each}
  </div>
</main>

<SvelteSeo
  title={`Stack | ${PUBLIC_NAME}`}
  description={`Stacks of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`}
  keywords={`stacks, ${PUBLIC_NAME}`}
  canonical={`${PUBLIC_DOMAIN}/stack`}
  openGraph={{
    title: `Stack | ${PUBLIC_NAME}`,
    description: `Stacks of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`,
    url: `${PUBLIC_DOMAIN}/stack`,
    type: "website",
    site_name: `Stack | ${PUBLIC_NAME}`,
    images: [
      {
        url: `${PUBLIC_DOMAIN}/favicon.png`,
        width: 128,
        height: 128,
        alt: `Stack | ${PUBLIC_NAME}`,
      },
    ],
  }}
  twitter={{
    card: "summary",
    site: "@zenta_blog",
    creator: "@zenta_blog",
  }}
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `${PUBLIC_DOMAIN}/stack`,
    name: `Stack | ${PUBLIC_NAME}`,
    description: `Stacks of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`,
  }}
/>
