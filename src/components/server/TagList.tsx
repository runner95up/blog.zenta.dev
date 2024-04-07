import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const TagList = ({ tags }: { tags: ItemMeta[] }) => {
  return (
    <section aria-labelledby="tag-list-heading">
      <h2 id="tag-list-heading" className="sr-only">
        Tag List
      </h2>
      <ul role="list" className="grid grid-cols-2 gap-4">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>
              <Card
                role="article"
                className="transition-transform duration-300 hover:shadow-lg hover:scale-105 hover:ring-1"
              >
                <Image
                  className="object-cover object-center h-48 p-2 mx-auto mt-2 max-w-7xl rounded-3xl"
                  src={tag.photo ?? "https://via.placeholder.com/360/144"}
                  alt={tag.name}
                  priority={false}
                  width={360}
                  height={144}
                />
                <CardHeader>
                  <CardTitle>{tag.name}</CardTitle>
                  <CardDescription className="truncate">
                    {tag.description}
                  </CardDescription>
                  <time dateTime={tag.updatedAt?.toISOString()}>
                    Updated at : {tag.updatedAt?.toLocaleDateString()}
                  </time>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
