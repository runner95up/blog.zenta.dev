import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultLayout } from "@/lib/config";
import { getAllMetaTags, getTagById } from "@/lib/server";
import { nullsToUndefined } from "@/lib/utils";
import { Metadata } from "next";
import { TagForm } from "./TagForm";
type Props = {
  params: {
    id: string;
  };
};
export const revalidate = 3600 * 12;

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

export default async function TagPageId({ params }: Props) {
  const { id } = params;
  const tag = await getTagById(id);
  return (
    <>
      <ResizablePanel defaultSize={defaultLayout[2]}>
        <section>
          <ScrollArea className="h-[calc(83vh)] ">
            <TagForm initialData={nullsToUndefined(tag)} />
          </ScrollArea>
        </section>
      </ResizablePanel>
    </>
  );
}
