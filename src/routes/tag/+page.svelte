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
  <h1 class="my-4 text-xl font-medium">Tag</h1>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
    {#each data.tags as tag}
      <a href={`/tag/${tag.id}`}>
        <Card.Root>
          <Image
            src={tag.photo ?? "https://via.placeholder.com/800x600"}
            layout="constrained"
            width={720}
            height={480}
            alt={tag.name}
            class="rounded-lg"
          />
          <Separator class="w-[calc(100%-2rem)] mx-auto" />
          <Card.Content class="mt-8">
            <Card.Title>{tag.name}</Card.Title>
            <Card.Description class="mt-2 line-clamp-3"
              >{tag.description}</Card.Description
            >
          </Card.Content>
        </Card.Root>
      </a>
    {/each}
  </div>
</main>

<SvelteSeo
  title={`Tag | ${PUBLIC_NAME}`}
  description={`Tags of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`}
  keywords={`tags, ${PUBLIC_NAME}`}
  canonical={`${PUBLIC_DOMAIN}/tag`}
  openGraph={{
    title: `Tag | ${PUBLIC_NAME}`,
    description: `Tags of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`,
    url: `${PUBLIC_DOMAIN}/tag`,
    type: "website",
    site_name: `Tag | ${PUBLIC_NAME}`,
    images: [
      {
        url: `${PUBLIC_DOMAIN}/favicon.png`,
        width: 128,
        height: 128,
        alt: `Tag | ${PUBLIC_NAME}`,
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
    "@type": "WebPage",
    url: `${PUBLIC_DOMAIN}/tag`,
    name: `Tag | ${PUBLIC_NAME}`,
    description: `Tags of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`,
  }}
/>
