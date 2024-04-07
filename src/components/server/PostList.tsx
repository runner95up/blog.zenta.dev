import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ItemMeta } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const PostList = async ({ posts }: { posts: ItemMeta[] }) => {
  return (
    <section aria-labelledby="post-list-heading">
      <h2 id="post-list-heading" className="sr-only">
        Post List
      </h2>
      <ul role="list" className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <Card
                role="article"
                className="transition-transform duration-300 hover:shadow-lg hover:scale-105 hover:ring-1"
              >
                <Image
                  className="object-cover object-center h-48 p-2 mx-auto mt-2 max-w-7xl rounded-3xl"
                  src={post.photo ?? "https://via.placeholder.com/360/144"}
                  alt={post.name}
                  priority={false}
                  width={360}
                  height={144}
                />
                <CardHeader>
                  <CardTitle>{post.name}</CardTitle>
                  <CardDescription className="truncate">
                    {post.description}
                  </CardDescription>
                  <time dateTime={post.updatedAt?.toISOString()}>
                    Updated at : {post.updatedAt?.toLocaleDateString()}
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
