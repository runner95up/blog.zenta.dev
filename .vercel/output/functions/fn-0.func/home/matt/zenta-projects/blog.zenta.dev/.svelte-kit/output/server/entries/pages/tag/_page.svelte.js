import { c as create_ssr_component, e as each, v as validate_component, a as add_attribute, b as escape } from "../../../chunks/ssr.js";
import { a as PUBLIC_NAME, P as PUBLIC_DOMAIN } from "../../../chunks/public.js";
import { C as Card, I as Image, S as Separator, b as Card_content, a as Card_title, c as Card_description } from "../../../chunks/image.js";
import "clsx";
import { S as Svelte_seo } from "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="container"><h1 class="my-8 text-2xl font-semibold" data-svelte-h="svelte-1waeufx">Tag</h1> <div class="grid grid-cols-4 gap-4">${each(data.tags, (tag) => {
    return `<a${add_attribute("href", `/tag/${tag.id}`, 0)}>${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Image, "Image").$$render(
          $$result,
          {
            src: tag.photo ?? "https://via.placeholder.com/800x600",
            layout: "constrained",
            width: 720,
            height: 480,
            alt: tag.name,
            class: "rounded-lg"
          },
          {},
          {}
        )} ${validate_component(Separator, "Separator").$$render($$result, { class: "w-[calc(100%-2rem)] mx-auto" }, {}, {})} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "mt-8" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(tag.name)}`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "mt-2 line-clamp-3" }, {}, {
              default: () => {
                return `${escape(tag.description)}`;
              }
            })} `;
          }
        })} `;
      }
    })} </a>`;
  })}</div></main> ${validate_component(Svelte_seo, "SvelteSeo").$$render(
    $$result,
    {
      title: `Tag | ${PUBLIC_NAME}`,
      description: `Tags of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`,
      keywords: `tags, ${PUBLIC_NAME}`,
      canonical: `${PUBLIC_DOMAIN}/tag`,
      openGraph: {
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
            alt: `Tag | ${PUBLIC_NAME}`
          }
        ]
      },
      twitter: {
        card: "summary",
        site: "@zenta_blog",
        creator: "@zenta_blog"
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: `${PUBLIC_DOMAIN}/tag`,
        name: `Tag | ${PUBLIC_NAME}`,
        description: `Tags of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`
      }
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
