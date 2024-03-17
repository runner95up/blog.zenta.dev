import { c as create_ssr_component, v as validate_component, a as add_attribute, b as escape } from "../../../../chunks/ssr.js";
import { a as PUBLIC_NAME, P as PUBLIC_DOMAIN } from "../../../../chunks/public.js";
import { C as Card, I as Image, S as Separator, a as Card_title, b as Card_content, c as Card_description } from "../../../../chunks/image.js";
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
              src: data.stack?.logo ?? "https://via.placeholder.com/800x600",
              layout: "constrained",
              width: 1280,
              height: 480,
              alt: data.stack?.name,
              class: "mx-auto rounded-lg"
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Separator, "Separator").$$render($$result, { class: "w-[calc(100%-2rem)] mx-auto" }, {}, {})} <a${add_attribute("href", data.stack?.url, 0)} class="flex gap-2 p-2 m-2 mx-4 bg-blue-900 rounded-lg w-min" target="_blank">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
        default: () => {
          return `${escape(data.stack?.name)}`;
        }
      })} <iconify-icon icon="streamline:interface-arrows-bend-up-right-2-arrow-bend-curve-change-direction-up-to-right"></iconify-icon></a> <a${add_attribute("href", data.stack?.founder.url, 0)} target="_blank">${validate_component(Card_content, "Card.Content").$$render($$result, { class: "mt-8" }, {}, {
        default: () => {
          return `<h1 class="text-2xl font-semibold" data-svelte-h="svelte-15jhb5r">Founder</h1> ${validate_component(Image, "Image").$$render(
            $$result,
            {
              src: data.stack?.founder.photo ?? "https://via.placeholder.com/800x600",
              layout: "constrained",
              width: 255,
              height: 255,
              alt: data.stack?.name,
              class: "my-2 rounded-lg"
            },
            {},
            {}
          )} ${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(data.stack?.founder.name)} ( ${escape(data.stack?.founder.type.toLocaleLowerCase().replace(/\b\w/g, (l) => l.toUpperCase()))}
          )`;
            }
          })}`;
        }
      })}</a> ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "mt-8" }, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(data.stack?.name)}`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "mt-2 line-clamp-3" }, {}, {
            default: () => {
              return `${escape(data.stack?.description)}`;
            }
          })}`;
        }
      })}`;
    }
  })}</main> ${validate_component(Svelte_seo, "SvelteSeo").$$render(
    $$result,
    {
      title: `${data.stack?.name} - Stack | ${PUBLIC_NAME}`,
      description: `${data.stack?.description ?? ""}`,
      keywords: `${data.stack?.name}, ${PUBLIC_NAME}`,
      canonical: `${PUBLIC_DOMAIN}/stack/${data.stack?.id}`,
      openGraph: {
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
            alt: data.stack?.name
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
        url: `${PUBLIC_DOMAIN}/stack/${data.stack?.id}`,
        name: `${data.stack?.name} - Stack | ${PUBLIC_NAME}`,
        description: `${data.stack?.description ?? ""}`
      }
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
