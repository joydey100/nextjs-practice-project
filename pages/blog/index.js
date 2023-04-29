import Link from "next/link";
import { useRouter } from "next/router";

const Blog = ({ blogs }) => {
  const router = useRouter();
  return (
    <div>
      <h2> Blog Page</h2>

      <Link href="/">Back to Home</Link>

      {blogs.map((blog) => {
        return (
          <div
            key={blog.id}
            style={{
              background: "#e0e0e0",
              padding: "1em",
              margin: "1em 0",
              cursor: "pointer",
            }}
            onClick={() => router.push(`blog/${blog.id}`)}
          >
            <h2>
              {blog.id}. {blog.title}
            </h2>
            <p> {blog.description.slice(0, 40)} [...]</p>
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(`http://localhost:4000/blog`);
  const data = await response.json();
  return {
    props: {
      blogs: data,
    },
  };
};

export default Blog;
