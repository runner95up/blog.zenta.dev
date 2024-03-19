<script lang="ts">
  import { PUBLIC_DOMAIN, PUBLIC_NAME } from "$env/static/public";
  import * as Card from "$lib/components/ui/card";
  import Separator from "@/lib/components/ui/separator/separator.svelte";
  import SvelteSeo from "@/lib/svelte-seo";
  import { Image } from "@unpic/svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<main class="container mt-4">
  <Image
    src={"https://images.unsplash.com/photo-1550745165-9bc0b252726f"}
    layout="constrained"
    width={1920}
    height={480}
    alt={"Zenta Blog hero banner"}
    class="rounded-xl"
  />
  <section class="max-w-4xl mx-auto my-4">
    <h1 class="mb-4 text-4xl font-bold text-center">{PUBLIC_NAME}</h1>
    <p class="mb-4 text-lg font-medium">
      {PUBLIC_NAME} is a website about programming 🧑‍💻. I will be posting about my
      programming progress, good and bad days and more. Also, I might have some videos
      of me coding 🎥.
    </p>
    <Separator />
  </section>
  <div class="grid max-w-4xl gap-4 mx-auto sm:grid-cols-2">
    {#each data.posts as post}
      <a href={`/post/${post.slug}`}>
        <Card.Root>
          <Image
            src={post.cover ?? "https://via.placeholder.com/800x600"}
            layout="constrained"
            width={720}
            height={480}
            alt={post.title}
            class="rounded-lg"
          />
          <Separator class="w-[calc(100%-2rem)] mx-auto" />
          <Card.Content class="mt-8">
            <Card.Title>{post.title}</Card.Title>
            <Card.Description class="mt-2 line-clamp-3"
              >{post.summary}</Card.Description
            >
          </Card.Content>
        </Card.Root>
      </a>
    {/each}
  </div>
</main>

<SvelteSeo
  title={`${PUBLIC_NAME}`}
  description="Zenta blog is a blog about web development, mobile development, programming, and technology"
  keywords="web development, programming, technology, mobile development, software development, software engineering, software, web, mobile"
  canonical={`${PUBLIC_DOMAIN}/`}
  openGraph={{
    title: `${PUBLIC_NAME}`,
    description:
      "Zenta blog is a blog about web development, mobile development, programming, and technology",
    url: `${PUBLIC_DOMAIN}/`,
    type: "website",
    site_name: `${PUBLIC_NAME}`,
    images: [
      {
        url: `${PUBLIC_DOMAIN}/favicon.png`,
        width: 128,
        height: 128,
        alt: `${PUBLIC_NAME}`,
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
    url: `${PUBLIC_DOMAIN}/`,
    name: `${PUBLIC_NAME}`,
    description:
      "Zenta blog is a blog about web development, mobile development, programming, and technology",
  }}
/>
