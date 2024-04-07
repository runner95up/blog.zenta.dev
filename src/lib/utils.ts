import { JsonValue } from "@prisma/client/runtime/library";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateHTML(json: JsonValue | undefined) {
  if (!json) {
    return "";
  }

  let html = "";
  const data = json as any;
  console.clear();
  for (const node of data.content) {
    const item = determineHTML(node);
    html += item;
  }
  console.log(html);
  return html;
}

function determineHTML(node: any) {
  // console.log(node);
  if (node.content === undefined) {
    return "";
  }
  switch (node.type) {
    case "heading":
      if (node.content !== undefined) {
        switch (node.attrs.level) {
          case 1:
            return `<h1 className="my-2 text-3xl font-bold">${node.content[0].text}</h1>`;
          case 2:
            return `<h2 className="my-2 text-2xl font-bold">${node.content[0].text}</h2>`;
          case 3:
            return `<h3 className="my-2 text-xl font-bold">${node.content[0].text}</h3>`;
        }
      }
    case "paragraph":
      if (node.content !== undefined) {
        return `<p>${node.content[0].text}</p>`;
      }
    case "taskList":
      if (node.content !== undefined) {
        return `<ul className="list-disc list-inside">${node.content
          .map(
            (item: any) =>
              `<li className="${item.checked ? "line-through" : ""}">${
                item.content[0].content[0].text
              }</li>`
          )
          .join("")}</ul>`;
      }
    case "codeBlock":
      if (node.content !== undefined) {
        return `<pre className="rounded bg-neutral-800">
          <code>${node.content[0].text}</code>
        </pre>`;
      }
    case "blockquote":
      if (node.content !== undefined) {
        return `<blockquote className="pl-4 border-l-4 border-neutral-500">${node.content
          .map(
            (item: any) =>
              '<p className="italic">' + item.content[0].text + "</p>"
          )
          .join("")}</blockquote>`;
      }
  }
}
