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
  <Card.Root>
    <Card.Header class="container">
      <Image
        src={data.tag?.photo ?? "https://via.placeholder.com/800x600"}
        layout="constrained"
        width={1280}
        height={480}
        alt={data.tag?.name}
        class="mx-auto rounded-lg"
      />
    </Card.Header>
    <Separator class="w-[calc(100%-2rem)] mx-auto" />
    <Card.Content class="mt-8">
      <Card.Title>{data.tag?.name}</Card.Title>
      <Card.Description class="mt-2 line-clamp-3"
        >{data.tag?.description}</Card.Description
      >
    </Card.Content>
  </Card.Root>
</main>

<SvelteSeo
  title={`${data.tag?.name} - Tag | ${PUBLIC_NAME}`}
  description={`${data.tag?.description ?? ""}`}
  keywords={`${data.tag?.name}, ${PUBLIC_NAME}`}
  canonical={`${PUBLIC_DOMAIN}/tag/${data.tag?.id}`}
  openGraph={{
    title: data.tag?.name,
    description: data.tag?.description ?? "",
    url: `${PUBLIC_DOMAIN}/tag/${data.tag?.id}`,
    type: "website",
    site_name: data.tag?.name,
    images: [
      {
        url: data.tag?.photo ?? "https://via.placeholder.com/800x600",
        width: 1280,
        height: 480,
        alt: data.tag?.name,
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
    url: `${PUBLIC_DOMAIN}/tag/${data.tag?.id}`,
    name: data.tag?.name,
    description: data.tag?.description ?? "",
  }}
/>
