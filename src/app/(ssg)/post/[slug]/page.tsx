import { extensions } from "@/components/client/editor";
import { getAllMetaPosts, getPostBySlug, heatCountPost } from "@/lib/server";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { Metadata } from "next";
import { CldOgImage } from "next-cloudinary";
import Image from "next/image";
import Code from "./Code";
import styles from "./style.module.css";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600 * 6;

export async function generateStaticParams() {
  const posts = await getAllMetaPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post?.title,
    description: post?.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  const content = post?.content as any;
  await heatCountPost(post?.id);

  let html = generateHTML(content, extensions);
  const pre = getPre(html);
  const { lang, code } = pre;
  const codeEl = await Code({ lang, code, filename: "code.js" });
  const img = imageReplace(html);
  const newHTML = parse(html);

  if (Array.isArray(newHTML)) {
    newHTML.forEach((el, i) => {
      if (el.type === "pre") {
        newHTML[i] = codeEl;
      }
      if (el.type === "img") {
        newHTML[i] = img;
      }
    });
  }

  return (
    <main className="max-w-5xl mx-auto my-2">
      <section>
        <figure className="inline-flex flex-col items-center relative w-full drop-shadow-2xl p-4">
          <Image
            className="rounded-xl object-cover object-center h-48 sm:h-64 md:h-96"
            src={post?.cover ?? "https://via.placeholder.com/360/144"}
            alt={post?.title ?? "Post photo"}
            width={1024}
            height={360}
          />
        </figure>
        <h1
          className={`my-4 text-4xl font-bold text-center ${
            styles.gradient_text
          }`}
        >
          {post?.title}
        </h1>
      </section>
      <article className="px-4 md:px-8 ">{newHTML}</article>
    </main>
  );
}

function getPre(html: string) {
  const regex = /<pre><code class="language-(.*?)">([\s\S]+?)<\/code><\/pre>/;
  const matches = html.match(regex);
  if (!matches) {
    return { lang: "javascript", code: "console.log('Hello, world!')" };
  }
  const [, lang, code] = matches;
  const newCode = replace(code);
  return { lang, code: newCode };
}

function replace(code: string) {
  return code
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&");
}

function getImg(html: string) {
  console.log(html);
  const regex = /<img src="(.*?)" alt="(.*?)" title="(.*?)"/;
  const matches = html.match(regex);
  if (!matches) {
    return {
      src: "https://via.placeholder.com/360/144",
      alt: "Post photo",
      title: "Post photo",
    };
  }
  const [, src, alt, title] = matches;
  return { src, alt, title };
}

function imageReplace(html: string) {
  const { src, alt, title } = getImg(html);
  const publicId = urlToPublicId(src);
  return (
    <figure className="flex items-center justify-center flex-col my-4">
      <CldOgImage src={publicId} alt={alt} />
      <Image
        className="rounded-xl object-cover object-center mb-2"
        src={src}
        alt={alt}
        width={480}
        height={360}
      />
      <figcaption className="text-center text-sm text-neutral-500 font-light w-full italic font-serif">
        {title}
      </figcaption>
    </figure>
  );
}

function urlToPublicId(url: string) {
  const parts = url.split("/");
  const publicId = parts[parts.length - 1].split(".")[0];
  return publicId;
}
