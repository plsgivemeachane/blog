import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type { BlogQuery, BlogQueryVariables } from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import FormattedDate from "../../src/components/react/FormattedDate.tsx";

type Props = {
  variables: BlogQueryVariables;
  data: BlogQuery;
  query: string;
};

export default function AdminBlogPost(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const blog = data.blog;

  return (
    <article className="my-4 mx-8 w-full">
      <div
        data-tina-field={tinaField(blog, "heroImage")}
        className="flex justify-center "
      >
        {blog.heroImage && (
          <img
            width={1020}
            height={510}
            src={blog.heroImage}
            alt=""
            className="w-[50%] rounded-lg"
          />
        )}
      </div>
      <div className="prose">
        <div className="title">
          <div className="date" data-tina-field={tinaField(blog, "pubDate")}>
            <p className="text-center mt-2">
              <FormattedDate date={blog.pubDate} />
            </p>
            {blog.updatedDate && (
              <div
                className="last-updated-on"
                data-tina-field={tinaField(blog, "updatedDate")}
              >
                Last updated on <FormattedDate date={blog.updatedDate} />
              </div>
            )}
          </div>
          <h1 data-tina-field={tinaField(blog, "title")}>{blog.title}</h1>
        </div>
        <div data-tina-field={tinaField(blog, "body")}>
          <TinaMarkdown content={blog.body} />
        </div>
      </div>
    </article>
  );
}
