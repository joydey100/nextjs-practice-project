import Link from "next/link";

const Home = () => {
  return (
    <section>
      <h2> Home Page</h2>
      <div className="menu">
        <ul>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/product">Product</Link>
          </li>
          <li>
            <Link href="/comments">Comments</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Home;
