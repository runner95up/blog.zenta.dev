import { getAllMetaTags, getTagById } from "@/lib/server";
import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
export const revalidate = 3600 * 6;

export async function generateStaticParams() {
  const tags = await getAllMetaTags();
  return tags.map((tag) => ({
    id: tag.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagById(params.id);
  return {
    title: tag?.name,
    description: tag?.description,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = await getTagById(params.id);
  return (
    <main className="max-w-5xl mx-auto my-2">
      <article>
        <Image
          src={tag?.photo ?? "https://via.placeholder.com/360/144"}
          alt={tag?.name ?? "Tag photo"}
          className="relative object-cover object-center max-w-5xl mx-auto rounded-3xl h-96"
          width={1024}
          height={360}
        />
        <h1 className="my-4 text-2xl font-bold text-center">{tag?.name}</h1>
        <p>{tag?.description}</p>
      </article>
    </main>
  );
}
