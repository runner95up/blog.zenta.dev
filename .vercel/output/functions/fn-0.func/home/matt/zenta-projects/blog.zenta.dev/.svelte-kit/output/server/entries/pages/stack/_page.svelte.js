import { c as create_ssr_component, e as each, v as validate_component, a as add_attribute, b as escape } from "../../../chunks/ssr.js";
import { a as PUBLIC_NAME, P as PUBLIC_DOMAIN } from "../../../chunks/public.js";
import { C as Card, I as Image, a as Card_title, S as Separator, b as Card_content, c as Card_description } from "../../../chunks/image.js";
import "clsx";
import { S as Svelte_seo } from "../../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="container"><h1 class="my-8 text-2xl font-semibold" data-svelte-h="svelte-17z87tt">Stack</h1> <div class="grid grid-cols-4 gap-4">${each(data.stacks, (stack) => {
    return `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `<a${add_attribute("href", `/stack/${stack.id}`, 0)}>${validate_component(Image, "Image").$$render(
          $$result,
          {
            src: stack.logo ?? "https://via.placeholder.com/800x600",
            layout: "constrained",
            width: 512,
            height: 360,
            alt: stack.name,
            class: "rounded-lg"
          },
          {},
          {}
        )}</a> <a${add_attribute("href", stack.url, 0)} class="flex gap-2 p-2 m-2 mx-4 bg-blue-900 rounded-lg w-min" target="_blank">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
          default: () => {
            return `${escape(stack.name)}`;
          }
        })} <iconify-icon icon="streamline:interface-arrows-bend-up-right-2-arrow-bend-curve-change-direction-up-to-right"></iconify-icon></a> ${validate_component(Separator, "Separator").$$render($$result, { class: "w-[calc(100%-2rem)] mx-auto" }, {}, {})} <a${add_attribute("href", `/stack/${stack.id}`, 0)}>${validate_component(Card_content, "Card.Content").$$render($$result, { class: "mt-8" }, {}, {
          default: () => {
            return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `${escape(stack.name)}`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "mt-2 line-clamp-3" }, {}, {
              default: () => {
                return `${escape(stack.description)}`;
              }
            })} `;
          }
        })}</a> `;
      }
    })}`;
  })}</div></main> ${validate_component(Svelte_seo, "SvelteSeo").$$render(
    $$result,
    {
      title: `Stack | ${PUBLIC_NAME}`,
      description: `Stacks of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`,
      keywords: `stacks, ${PUBLIC_NAME}`,
      canonical: `${PUBLIC_DOMAIN}/stack`,
      openGraph: {
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
            alt: `Stack | ${PUBLIC_NAME}`
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
        "@type": "WebSite",
        url: `${PUBLIC_DOMAIN}/stack`,
        name: `Stack | ${PUBLIC_NAME}`,
        description: `Stacks of ${PUBLIC_NAME} used for categorizing posts and pages on this blog`
      }
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
