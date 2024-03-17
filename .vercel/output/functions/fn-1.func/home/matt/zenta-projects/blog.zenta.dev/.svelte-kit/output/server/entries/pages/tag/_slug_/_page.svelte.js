import { c as create_ssr_component, v as validate_component, b as escape } from "../../../../chunks/ssr.js";
import { a as PUBLIC_NAME, P as PUBLIC_DOMAIN } from "../../../../chunks/public.js";
import { C as Card, I as Image, S as Separator, b as Card_content, a as Card_title, c as Card_description } from "../../../../chunks/image.js";
import "clsx";
import { C as Card_header } from "../../../../chunks/card-header.js";
import { S as Svelte_seo } from "../../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="container">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "container" }, {}, {
        default: () => {
          return `${validate_component(Image, "Image").$$render(
            $$result,
            {
              src: data.tag?.photo ?? "https://via.placeholder.com/800x600",
              layout: "constrained",
              width: 1280,
              height: 480,
              alt: data.tag?.name,
              class: "mx-auto rounded-lg"
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Separator, "Separator").$$render($$result, { class: "w-[calc(100%-2rem)] mx-auto" }, {}, {})} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "mt-8" }, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(data.tag?.name)}`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "mt-2 line-clamp-3" }, {}, {
            default: () => {
              return `${escape(data.tag?.description)}`;
            }
          })}`;
        }
      })}`;
    }
  })}</main> ${validate_component(Svelte_seo, "SvelteSeo").$$render(
    $$result,
    {
      title: `${data.tag?.name} - Tag | ${PUBLIC_NAME}`,
      description: `${data.tag?.description ?? ""}`,
      keywords: `${data.tag?.name}, ${PUBLIC_NAME}`,
      canonical: `${PUBLIC_DOMAIN}/tag/${data.tag?.id}`,
      openGraph: {
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
            alt: data.tag?.name
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
        url: `${PUBLIC_DOMAIN}/tag/${data.tag?.id}`,
        name: data.tag?.name,
        description: data.tag?.description ?? ""
      }
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
