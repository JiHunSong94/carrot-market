import Layout from "@components/layout";
import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, NextPage } from "next";
import { GetStaticProps } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Post: NextPage<{ data: any; post: string }> = ({ data, post }) => {
  return (
    <Layout canGoBack title={data.title} seoTitle={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = readdirSync("./posts").map((file) => {
    const [name, extension] = file.split(".");
    return { params: { slug: name } };
  });
  return {
    paths: files,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { content, data } = matter.read(`./posts/${context.params?.slug}.md`);
  const html = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  console.log(data);
  return {
    props: { data, post: String(html) },
  };
};

export default Post;
