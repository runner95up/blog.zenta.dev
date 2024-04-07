import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const StackList = async ({ stacks }: { stacks: ItemMeta[] }) => {
  return (
    <section aria-labelledby="stacks-list-heading">
      <h2 id="stacks-list-heading" className="sr-only">
        Stack List
      </h2>
      <ul role="list" className="grid grid-cols-2 gap-4">
        {stacks.map((stack) => (
          <li key={stack.id}>
            <Link href={`/stack/${stack.id}`}>
              <Card
                role="article"
                className="transition-transform duration-300 hover:shadow-lg hover:scale-105 hover:ring-1"
              >
                <Image
                  className="object-cover object-center h-48 p-2 mx-auto mt-2 max-w-7xl rounded-3xl"
                  src={stack.photo ?? "https://via.placeholder.com/360/144"}
                  alt={stack.name}
                  priority={false}
                  width={360}
                  height={144}
                />
                <CardHeader>
                  <CardTitle>{stack.name}</CardTitle>
                  <CardDescription className="truncate">
                    {stack.description}
                  </CardDescription>
                  <time dateTime={stack.updatedAt?.toISOString()}>
                    Updated at : {stack.updatedAt?.toLocaleDateString()}
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
