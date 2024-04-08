import { getAllMetaPosts, getPostBySlug } from "@/lib/server";
import { generateHTML } from "@/lib/utils";
import parse from "html-react-parser";
import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: {
    slug: string;
  };
};
export const revalidate = 3600 * 12;

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

  const content = generateHTML(post?.content);

  return (
    <main className="max-w-5xl mx-auto my-2">
      <article>
        <Image
          src={post?.cover ?? "https://via.placeholder.com/360/144"}
          alt={post?.title ?? "Post photo"}
          className="relative object-cover object-center max-w-5xl mx-auto rounded-3xl h-96"
          width={1024}
          height={360}
        />
        <h1 className="my-4 text-2xl font-bold text-center">{post?.title}</h1>

        {parse(content)}
      </article>
    </main>
  );
}
