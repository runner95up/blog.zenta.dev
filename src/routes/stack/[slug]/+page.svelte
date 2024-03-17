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
        src={data.stack?.logo ?? "https://via.placeholder.com/800x600"}
        layout="constrained"
        width={1280}
        height={480}
        alt={data.stack?.name}
        class="mx-auto rounded-lg"
      />
    </Card.Header>
    <Separator class="w-[calc(100%-2rem)] mx-auto" />
    <a
      href={data.stack?.url}
      class="flex gap-2 p-2 m-2 mx-4 bg-blue-900 rounded-lg w-min"
      target="_blank"
    >
      <Card.Title>{data.stack?.name}</Card.Title>
      <iconify-icon
        icon="streamline:interface-arrows-bend-up-right-2-arrow-bend-curve-change-direction-up-to-right"
      ></iconify-icon>
    </a>

    <a href={data.stack?.founder.url} target="_blank">
      <Card.Content class="mt-8">
        <h1 class="text-2xl font-semibold">Founder</h1>
        <Image
          src={data.stack?.founder.photo ??
            "https://via.placeholder.com/800x600"}
          layout="constrained"
          width={255}
          height={255}
          alt={data.stack?.name}
          class="my-2 rounded-lg"
        />
        <Card.Title>
          {data.stack?.founder.name} ( {data.stack?.founder.type
            .toLocaleLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase())}
          )
        </Card.Title>
      </Card.Content></a
    >
    <Card.Content class="mt-8">
      <Card.Title>{data.stack?.name}</Card.Title>
      <Card.Description class="mt-2 line-clamp-3">
        {data.stack?.description}
      </Card.Description>
    </Card.Content>
  </Card.Root>
</main>

<SvelteSeo
  title={`${data.stack?.name} - Stack | ${PUBLIC_NAME}`}
  description={`${data.stack?.description ?? ""}`}
  keywords={`${data.stack?.name}, ${PUBLIC_NAME}`}
  canonical={`${PUBLIC_DOMAIN}/stack/${data.stack?.id}`}
  openGraph={{
    title: data.stack?.name,
    description: data.stack?.description ?? "",
    url: `${PUBLIC_DOMAIN}/stack/${data.stack?.id}`,
    type: "website",
    site_name: data.stack?.name,
    images: [
      {
        url: data.stack?.logo ?? "https://via.placeholder.com/800x600",
        width: 1280,
        height: 480,
        alt: data.stack?.name,
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
    url: `${PUBLIC_DOMAIN}/stack/${data.stack?.id}`,
    name: `${data.stack?.name} - Stack | ${PUBLIC_NAME}`,
    description: `${data.stack?.description ?? ""}`,
  }}
/>
