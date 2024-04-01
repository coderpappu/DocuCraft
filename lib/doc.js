import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
const postsDirectory = path.join(process.cwd(), "docs");

export function getDocuments() {
  //   get the all files name in a array
  const fileNames = fs.readdirSync(postsDirectory);

  const allDocuments = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");

    // create a full path for every file
    const fullPath = path.join(postsDirectory, fileName);

    // read every file in text formate
    const fileContents = fs.readFileSync(fullPath, "utf8");

    //convert object formate
    const matterResult = matter(fileContents);

    // return specific order
    return {
      id,
      ...matterResult.data,
    };
  });

  //   soft all documents by oder
  return allDocuments.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    return 0;
  });
}

export async function getDocumentContent(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
