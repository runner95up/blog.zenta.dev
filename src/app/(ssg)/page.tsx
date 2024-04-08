import { Separator } from "@/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Image from "next/image";

import { Logo } from "@/components/brand";
import { PostList, StackList, TagList } from "@/components/server";
import { getMetaPosts, getMetaTags, getMetaTechs } from "@/lib/server";
import banner from "../../../public/cover.webp";

const title = process.env.NEXT_PUBLIC_SITE_NAME;
const url = process.env.NEXT_PUBLIC_SITE_URL;

export const revalidate = 3600 * 12;

export const metadata: Metadata = {
  title,
  description: `${title} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
  keywords: `programming, coding, web development, software development, software engineering, developer, web developer, software developer, programming blog, coding blog, web development blog, software development blog, software engineering blog, developer blog, web developer blog, software developer blog, programming videos, coding videos, web development videos, software development videos, software engineering videos, developer videos, web developer videos, software developer videos, programming tutorials, coding tutorials, web development tutorials, software development tutorials, software engineering tutorials, developer tutorials, web developer tutorials, software developer tutorials`,
  openGraph: {
    title,
    description: `${title} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
    url,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    site: "@zenta-dev",
    title,
    description: `${title} is a website about programming 🧑‍💻 . I will be posting about my programming progress, good and bad days and more. Also, I might have some videos of me coding 🎥 .`,
  },
};

export default async function Home() {
  const tags = await getMetaTags({ limit: 10, page: 1 });
  const posts = await getMetaPosts({ limit: 10, page: 1 });
  const stacks = await getMetaTechs({ limit: 10, page: 1 });

  return (
    <main className="mt-4">
      <section className="flex flex-col items-center">
        <Image
          src={banner}
          className="relative object-cover object-center mx-auto max-w-7xl rounded-3xl h-72"
          alt={`Banner image for ${title} landing page`}
          priority
        />
        <Logo
          width={86}
          className="relative z-50 w-20 h-20 -mt-10 bg-transparent rounded-xl"
        />
        <h1 className="my-4 text-3xl font-semibold">{title}</h1>
        <p className="max-w-3xl my-2">
          {title} is a website about programming 🧑‍💻. I will be posting about my
          programming progress, good and bad days and more. Also, I might have
          some videos of me coding 🎥.
        </p>
      </section>
      <Separator className="max-w-3xl my-4" />
      <section className="max-w-3xl mx-auto">
        <Tabs defaultValue="post" className="">
          <TabsList className="justify-around w-full mx-auto" role="tablist">
            <TabsTrigger
              className=""
              value="post"
              role="tab"
              aria-controls="post-tab"
            >
              Post
            </TabsTrigger>
            <TabsTrigger
              className=""
              value="tag"
              role="tab"
              aria-controls="tag-tab"
            >
              Tag
            </TabsTrigger>
            <TabsTrigger
              className=""
              value="stack"
              role="tab"
              aria-controls="stack-tab"
            >
              Stack
            </TabsTrigger>
          </TabsList>
          <Separator className="max-w-3xl my-4" />
          <TabsContent
            value="post"
            id="post-tab"
            role="tabpanel"
            aria-labelledby="post"
            tabIndex={0}
          >
            <PostList posts={posts} />
          </TabsContent>
          <TabsContent
            value="tag"
            id="tag-tab"
            role="tabpanel"
            aria-labelledby="tag"
            tabIndex={1}
          >
            <TagList tags={tags} />
          </TabsContent>
          <TabsContent
            value="stack"
            id="stack-tab"
            role="tabpanel"
            aria-labelledby="stack"
            tabIndex={2}
          >
            <StackList stacks={stacks} />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
