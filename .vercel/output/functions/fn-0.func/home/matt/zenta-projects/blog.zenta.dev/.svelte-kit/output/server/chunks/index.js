import "dequal";
import { d as derived, w as writable, r as readable } from "./index2.js";
import { p as get_store_value, c as create_ssr_component, e as each, b as escape, a as add_attribute, v as validate_component } from "./ssr.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
function validate_dynamic_element(tag) {
  const is_string = typeof tag === "string";
  if (tag && !is_string) {
    throw new Error('<svelte:element> expects "this" attribute to be a string.');
  }
}
function validate_void_dynamic_element(tag) {
  if (tag && is_void(tag)) {
    console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
  }
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
({
  type: "hidden",
  "aria-hidden": true,
  hidden: true,
  tabIndex: -1,
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name}`]: "",
              action: action ?? noop
            });
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name}`]: "",
          action: action ?? noop
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name}`]: "",
            action: action ?? noop
          });
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name}`]: "",
        action: action ?? noop
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get());
      }));
    });
    subscriber(get());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get,
    subscribe
  };
};
const kbd = {
  ALT: "Alt",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  BACKSPACE: "Backspace",
  CAPS_LOCK: "CapsLock",
  CONTROL: "Control",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  F1: "F1",
  F10: "F10",
  F11: "F11",
  F12: "F12",
  F2: "F2",
  F3: "F3",
  F4: "F4",
  F5: "F5",
  F6: "F6",
  F7: "F7",
  F8: "F8",
  F9: "F9",
  HOME: "Home",
  META: "Meta",
  PAGE_DOWN: "PageDown",
  PAGE_UP: "PageUp",
  SHIFT: "Shift",
  SPACE: " ",
  TAB: "Tab",
  CTRL: "Control",
  ASTERISK: "*",
  A: "a",
  P: "p"
};
readable(void 0, (set) => {
  function clicked(event) {
    set(event);
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "pointerup", clicked, {
    passive: false,
    capture: true
  });
  return unsubscribe;
});
readable(void 0, (set) => {
  function keydown(event) {
    if (event && event.key === kbd.ESCAPE) {
      set(event);
    }
    set(void 0);
  }
  const unsubscribe = addEventListener(document, "keydown", keydown, {
    passive: false
  });
  return unsubscribe;
});
({
  prefix: "",
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0)
});
const defaults = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  positioning: {
    placement: "bottom"
  },
  closeOnEscape: true,
  closeOnOutsideClick: true,
  onOutsideClick: void 0,
  preventScroll: false,
  forceVisible: false,
  locale: "en",
  granularity: void 0,
  disabled: false,
  readonly: false,
  minValue: void 0,
  maxValue: void 0,
  weekdayFormat: "narrow",
  ...omit(defaults, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Open_graph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { openGraph = void 0 } = $$props;
  if ($$props.openGraph === void 0 && $$bindings.openGraph && openGraph !== void 0)
    $$bindings.openGraph(openGraph);
  return `${openGraph ? `${each(Object.entries(openGraph), ([key, value]) => {
    let _type = typeof value;
    return `  ${_type !== "object" ? (() => {
      let transform = key.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
      return ` <meta property="${"og:" + escape(transform, true)}"${add_attribute("content", value, 0)}>`;
    })() : ``} ${_type === "object" ? `${key === "images" ? `${each(openGraph.images ?? [], (image) => {
      return `${each(Object.entries(image), ([key2, value2]) => {
        return `<meta property="${"og:image:" + escape(key2, true)}"${add_attribute("content", value2.toString(), 0)}>`;
      })}`;
    })}` : `${key === "videos" ? `${each(openGraph.videos ?? [], (video) => {
      return `${each(Object.entries(video), ([key2, value2]) => {
        return `${key2 === "url" ? `<meta property="og:video"${add_attribute("content", value2.toString(), 0)}>` : `<meta property="${"og:video:" + escape(key2, true)}"${add_attribute("content", value2.toString(), 0)}>`}`;
      })}`;
    })}` : `${key === "localeAlternate" ? `${each(openGraph.localeAlternate ?? [], (alternate) => {
      return `<meta property="og:locale:alternate"${add_attribute("content", alternate, 0)}>`;
    })}` : `${key === "music" ? `${each(Object.entries(openGraph.music ?? {}), ([key2, value2]) => {
      let transform = key2.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
      return ` <meta property="${"music:" + escape(transform, true)}"${add_attribute("content", value2.toString(), 0)}>`;
    })}` : `${key === "movie" ? `${each(Object.entries(openGraph.movie ?? {}), ([key2, value2]) => {
      return `${typeof value2 === "object" ? `${each(value2, (propValue) => {
        return `<meta property="${"video:" + escape(key2, true)}"${add_attribute("content", propValue, 0)}>`;
      })}` : (() => {
        let transform = key2.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
        return ` <meta property="${"video:" + escape(transform, true)}"${add_attribute("content", value2.toString(), 0)}>`;
      })()}`;
    })}` : `${key === "article" ? `${each(Object.entries(openGraph.article ?? {}), ([key2, value2]) => {
      return `${typeof value2 === "object" ? `${each(value2, (propValue) => {
        return `<meta property="${"article:" + escape(key2, true)}"${add_attribute("content", propValue, 0)}>`;
      })}` : (() => {
        let transform = key2.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
        return ` <meta property="${"article:" + escape(transform, true)}"${add_attribute("content", value2.toString(), 0)}>`;
      })()}`;
    })}` : `${key === "book" ? `${each(Object.entries(openGraph.book ?? {}), ([key2, value2]) => {
      return `${typeof value2 === "object" ? `${each(value2, (propValue) => {
        return `<meta property="${"book:" + escape(key2, true)}"${add_attribute("content", propValue, 0)}>`;
      })}` : (() => {
        let transform = key2.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
        return ` <meta property="${"book:" + escape(transform, true)}"${add_attribute("content", value2.toString(), 0)}>`;
      })()}`;
    })}` : `${key === "profile" ? `${each(Object.entries(openGraph.profile ?? {}), ([key2, value2]) => {
      let transform = key2.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
      return ` <meta property="${"profile:" + escape(transform, true)}"${add_attribute("content", value2, 0)}>`;
    })}` : ``}`}`}`}`}`}`}`}` : ``}`;
  })}` : ``}`;
});
const Svelte_seo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = void 0 } = $$props;
  let { description = void 0 } = $$props;
  let { keywords = void 0 } = $$props;
  let { base = void 0 } = $$props;
  let { applicationName = void 0 } = $$props;
  let { themeColor = void 0 } = $$props;
  let { nofollow = false } = $$props;
  let { noindex = false } = $$props;
  let { nositelinkssearchbox = false } = $$props;
  let { notranslate = false } = $$props;
  let { canonical = void 0 } = $$props;
  let { amp = void 0 } = $$props;
  let { manifest = void 0 } = $$props;
  let { languageAlternates = void 0 } = $$props;
  let { twitter = void 0 } = $$props;
  let { openGraph = void 0 } = $$props;
  let { facebook = void 0 } = $$props;
  let { jsonLd = void 0 } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.keywords === void 0 && $$bindings.keywords && keywords !== void 0)
    $$bindings.keywords(keywords);
  if ($$props.base === void 0 && $$bindings.base && base !== void 0)
    $$bindings.base(base);
  if ($$props.applicationName === void 0 && $$bindings.applicationName && applicationName !== void 0)
    $$bindings.applicationName(applicationName);
  if ($$props.themeColor === void 0 && $$bindings.themeColor && themeColor !== void 0)
    $$bindings.themeColor(themeColor);
  if ($$props.nofollow === void 0 && $$bindings.nofollow && nofollow !== void 0)
    $$bindings.nofollow(nofollow);
  if ($$props.noindex === void 0 && $$bindings.noindex && noindex !== void 0)
    $$bindings.noindex(noindex);
  if ($$props.nositelinkssearchbox === void 0 && $$bindings.nositelinkssearchbox && nositelinkssearchbox !== void 0)
    $$bindings.nositelinkssearchbox(nositelinkssearchbox);
  if ($$props.notranslate === void 0 && $$bindings.notranslate && notranslate !== void 0)
    $$bindings.notranslate(notranslate);
  if ($$props.canonical === void 0 && $$bindings.canonical && canonical !== void 0)
    $$bindings.canonical(canonical);
  if ($$props.amp === void 0 && $$bindings.amp && amp !== void 0)
    $$bindings.amp(amp);
  if ($$props.manifest === void 0 && $$bindings.manifest && manifest !== void 0)
    $$bindings.manifest(manifest);
  if ($$props.languageAlternates === void 0 && $$bindings.languageAlternates && languageAlternates !== void 0)
    $$bindings.languageAlternates(languageAlternates);
  if ($$props.twitter === void 0 && $$bindings.twitter && twitter !== void 0)
    $$bindings.twitter(twitter);
  if ($$props.openGraph === void 0 && $$bindings.openGraph && openGraph !== void 0)
    $$bindings.openGraph(openGraph);
  if ($$props.facebook === void 0 && $$bindings.facebook && facebook !== void 0)
    $$bindings.facebook(facebook);
  if ($$props.jsonLd === void 0 && $$bindings.jsonLd && jsonLd !== void 0)
    $$bindings.jsonLd(jsonLd);
  return `${$$result.head += `<!-- HEAD_svelte-edm2kb_START -->${title ? `${$$result.title = `<title>${escape(title)}</title>`, ""}` : ``}${description ? `<meta name="description"${add_attribute("content", description, 0)}>` : ``}${canonical ? `<link rel="canonical"${add_attribute("href", canonical, 0)}>` : ``}${keywords ? `<meta name="keywords"${add_attribute("content", keywords, 0)}>` : ``}${amp ? `<link rel="amphtml"${add_attribute("href", amp, 0)}>` : ``}${manifest ? `<link rel="manifest"${add_attribute("href", manifest, 0)}>` : ``}${applicationName ? `<meta name="application-name"${add_attribute("content", applicationName, 0)}>` : ``}${languageAlternates ? `${each(languageAlternates, ({ href, hreflang }) => {
    return `<link rel="alternate"${add_attribute("href", href, 0)}${add_attribute("hreflang", hreflang, 0)}>`;
  })}` : ``}${themeColor ? `<meta name="theme-color"${add_attribute("content", themeColor, 0)}>` : ``}${base ? `<base${add_attribute("href", base, 0)}>` : ``}${facebook?.appId ? `<meta property="fb:app_id"${add_attribute("content", facebook.appId, 0)}>` : ``}<meta name="robots"${add_attribute("content", `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`, 0)}><meta name="googlebot"${add_attribute("content", `${noindex ? "noindex" : "index"},${nofollow ? "nofollow" : "follow"}`, 0)}>${nositelinkssearchbox ? `<meta name="google" content="nositelinkssearchbox">` : ``}${notranslate ? `<meta name="google" content="notranslate">` : ``}${twitter ? `${each(Object.entries(twitter), ([key, value]) => {
    let transformed = key.replace(/([a-z])([A-Z])/g, "$1:$2").toLowerCase();
    return `  <meta name="${"twitter:" + escape(transformed, true)}"${add_attribute("content", value, 0)}>`;
  })}` : ``}${openGraph ? `${validate_component(Open_graph, "OpenGraphComponent").$$render($$result, { openGraph }, {}, {})}` : ``}${jsonLd ? (() => {
    let data = Object.assign({ "@context": "https://schema.org" }, jsonLd);
    return ` <!-- HTML_TAG_START -->${`<script type="application/ld+json">${JSON.stringify(data) + "<"}/script>`}<!-- HTML_TAG_END -->`;
  })() : ``}${slots.default ? slots.default({}) : ``}<!-- HEAD_svelte-edm2kb_END -->`, ""}`;
});
export {
  Svelte_seo as S,
  validate_void_dynamic_element as a,
  cn as c,
  is_void as i,
  makeElement as m,
  validate_dynamic_element as v,
  withGet as w
};
