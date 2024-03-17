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
        src={data.post?.cover ?? "https://via.placeholder.com/800x600"}
        layout="constrained"
        width={1280}
        height={480}
        alt={data.post?.title}
        class="mx-auto rounded-lg"
      />
    </Card.Header>
    <Separator class="w-[calc(100%-2rem)] mx-auto" />
    <Card.Content class="mt-8">
      <Card.Title>{data.post?.title}</Card.Title>
      <Card.Description class="mt-2 line-clamp-3">
        {data.post?.summary}
      </Card.Description>
    </Card.Content>
  </Card.Root>
</main>

<SvelteSeo
  title={`${data.post?.title} - Post | ${PUBLIC_NAME}`}
  description={`${data.post?.summary ?? ""}`}
  keywords={`${data.post?.title}, ${PUBLIC_NAME}`}
  canonical={`${PUBLIC_DOMAIN}/post/${data.post?.id}`}
  openGraph={{
    title: data.post?.title,
    description: data.post?.summary ?? "",
    url: `${PUBLIC_DOMAIN}/post/${data.post?.id}`,
    type: "website",
    site_name: data.post?.title,
    images: [
      {
        url: data.post?.cover ?? "https://via.placeholder.com/800x600",
        width: 1280,
        height: 480,
        alt: data.post?.title,
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
    url: `${PUBLIC_DOMAIN}/post/${data.post?.id}`,
    name: data.post?.title,
    description: data.post?.summary ?? "",
  }}
/>
