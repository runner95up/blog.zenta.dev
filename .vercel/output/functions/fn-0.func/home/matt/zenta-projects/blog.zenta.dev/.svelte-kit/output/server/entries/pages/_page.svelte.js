import { c as create_ssr_component, d as compute_rest_props, s as spread, f as escape_attribute_value, g as escape_object, a as add_attribute, v as validate_component, e as each, b as escape } from "../../chunks/ssr.js";
import { a as PUBLIC_NAME, P as PUBLIC_DOMAIN } from "../../chunks/public.js";
import "dequal";
import { v as validate_dynamic_element, a as validate_void_dynamic_element, i as is_void, c as cn, S as Svelte_seo } from "../../chunks/index.js";
import { tv } from "tailwind-variants";
import "clsx";
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key) => {
      if (key !== "action") {
        attrs[key] = builder[key];
      }
    });
  });
  return attrs;
}
const Button$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "type", "builders", "el"]);
  let { href = void 0 } = $$props;
  let { type = void 0 } = $$props;
  let { builders = [] } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-button-root": "" };
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0)
    $$bindings.builders(builders);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  return `${builders && builders.length ? ` ${((tag) => {
    validate_dynamic_element(tag);
    return tag ? (() => {
      validate_void_dynamic_element(tag);
      return `<${href ? "a" : "button"}${spread(
        [
          {
            type: escape_attribute_value(href ? void 0 : type)
          },
          { href: escape_attribute_value(href) },
          { tabindex: "0" },
          escape_object(getAttrs(builders)),
          escape_object($$restProps),
          escape_object(attrs)
        ],
        {}
      )}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}`;
    })() : "";
  })(href ? "a" : "button")}` : ` ${((tag) => {
    validate_dynamic_element(tag);
    return tag ? (() => {
      validate_void_dynamic_element(tag);
      return `<${href ? "a" : "button"}${spread(
        [
          {
            type: escape_attribute_value(href ? void 0 : type)
          },
          { href: escape_attribute_value(href) },
          { tabindex: "0" },
          escape_object($$restProps),
          escape_object(attrs)
        ],
        {}
      )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}`;
    })() : "";
  })(href ? "a" : "button")}`}`;
});
const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "builders"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { builders = [] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.builders === void 0 && $$bindings.builders && builders !== void 0)
    $$bindings.builders(builders);
  return `${validate_component(Button$1, "ButtonPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { builders },
      {
        class: cn(buttonVariants({ variant, size, className }))
      },
      { type: "button" },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${each(data.posts, (post) => {
    return `<div><h1>${escape(post.title)}</h1> <p>${escape(post.content)}</p> </div>`;
  })} ${validate_component(Button, "Button").$$render($$result, {}, {}, {
    default: () => {
      return `Page`;
    }
  })} ${validate_component(Svelte_seo, "SvelteSeo").$$render(
    $$result,
    {
      title: `${PUBLIC_NAME}`,
      description: "Zenta blog is a blog about web development, mobile development, programming, and technology",
      keywords: "web development, programming, technology, mobile development, software development, software engineering, software, web, mobile",
      canonical: `${PUBLIC_DOMAIN}/`,
      openGraph: {
        title: `${PUBLIC_NAME}`,
        description: "Zenta blog is a blog about web development, mobile development, programming, and technology",
        url: `${PUBLIC_DOMAIN}/`,
        type: "website",
        site_name: `${PUBLIC_NAME}`,
        images: [
          {
            url: `${PUBLIC_DOMAIN}/favicon.png`,
            width: 128,
            height: 128,
            alt: `${PUBLIC_NAME}`
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
        url: `${PUBLIC_DOMAIN}/`,
        name: `${PUBLIC_NAME}`,
        description: "Zenta blog is a blog about web development, mobile development, programming, and technology"
      }
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
