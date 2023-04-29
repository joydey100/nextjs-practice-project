import Link from "next/link";
import React from "react";

const BlogItem = ({ blogItem }) => {
  return (
    <div>
      <Link href="/blog">Back to Blog Page </Link>
      <h2>
        {blogItem.id}. {blogItem.title}
      </h2>
      <p> {blogItem.description} </p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const response = await fetch(`http://localhost:4000/blog`);
  const data = await response.json();

  const paths = data.map((item) => {
    return {
      params: {
        id: `${item.id}`,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;

  const response = await fetch(`http://localhost:4000/blog/${params.id}`);
  const data = await response.json();

  return {
    props: {
      blogItem: data,
    },
  };
};

export default BlogItem;
