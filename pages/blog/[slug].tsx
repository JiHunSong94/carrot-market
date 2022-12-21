import { readdirSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import { GetStaticProps } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Post: NextPage<{ post: string }> = ({ post }) => {
  return <h1>{post}</h1>;
};

export function getStaticPaths() {
  const files = readdirSync("./posts").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { content } = matter.read(`./posts/${context.params?.slug}.md`);
  const html = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: { post: String(html) },
  };
};

export default Post;
