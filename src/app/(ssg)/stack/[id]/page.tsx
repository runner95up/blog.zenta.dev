import { getAllMetaTechs, getTechById } from "@/lib/server";
import { Metadata } from "next";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
export const revalidate = 3600 * 6;

export async function generateStaticParams() {
  const techs = await getAllMetaTechs();
  return techs.map((tech) => ({
    id: tech.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tech = await getTechById(params.id);
  return {
    title: tech?.name,
    description: tech?.description,
  };
}

export default async function TechPage({ params }: Props) {
  const tech = await getTechById(params.id);
  return (
    <main className="max-w-5xl mx-auto my-2">
      <article>
        <Image
          src={tech?.logo ?? "https://via.placeholder.com/360/144"}
          alt={tech?.name ?? "Tech photo"}
          className="relative object-cover object-center max-w-5xl mx-auto rounded-3xl h-96"
          width={1024}
          height={360}
        />
        <h1 className="my-4 text-2xl font-bold text-center">{tech?.name}</h1>
        <p>{tech?.description}</p>
      </article>
    </main>
  );
}
