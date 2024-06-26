import { ResizablePanel } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { defaultLayout } from "@/lib/config";
import { getTagById } from "@/lib/server";
import { nullsToUndefined } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { TagForm } from "./TagForm";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagById(params.id);
  return {
    title: tag?.name,
    description: tag?.description,
  };
}

export default async function TagPageId({ params }: Props) {
  const { id } = params;
  if (!id) {
    redirect("/studio/tags");
  }
  const tag = await getTagById(id);

  if (!tag && id !== "new") {
    redirect("/studio/tags");
  }

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
