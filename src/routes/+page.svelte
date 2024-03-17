<script lang="ts">
  import { PUBLIC_DOMAIN, PUBLIC_NAME } from "$env/static/public";
  import Button from "@/lib/components/ui/button/button.svelte";
  import SvelteSeo from "@/lib/svelte-seo";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#each data.posts as post}
  <div>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
  </div>
{/each}

<Button>Page</Button>

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
