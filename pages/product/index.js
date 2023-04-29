import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Product = ({ products }) => {
  const router = useRouter();
  const [allProduct, setAllProduct] = useState(products);
  const [categories, setCategories] = useState([]);

  //   get all categories in inital load
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`http://localhost:4000/product`);
      const data = await response.json();
      const categories = ["All", ...new Set(data.map((item) => item.category))];
      setCategories(categories);
    };
    getCategories();
  }, []);

  // filter Category
  const filterCategory = async (category) => {
    if (category === "All") {
      setAllProduct(products);
      router.push(`/product`);
    } else {
      const response = await fetch(
        `http://localhost:4000/product?category=${category}`
      );
      const data = await response.json();
      setAllProduct(data);
      router.push(`/product?category=${category}`, undefined, {
        shallow: true,
      });
    }
  };

  return (
    <div>
      <h2>Products List</h2>
      <Link href="/">Back to Home</Link>

      <div
        className="product-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1.5em 0",
        }}
      >
        <div className="product-left" style={{ flexBasis: "20%" }}>
          {/* show category */}
          <h4> Filter by Category </h4>
          <ul className="category-list">
            {categories.map((category) => {
              return (
                <li
                  key={category}
                  style={{
                    margin: "1em 0",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                  onClick={() => filterCategory(category)}
                >
                  {" "}
                  {category}{" "}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="product-right" style={{ flexBasis: "80%" }}>
          {allProduct.map((list) => {
            return (
              <div
                key={list.id}
                style={{
                  padding: "1em",
                  background: "#ddd",
                  margin: "1em 0",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`/product/${list.id}`)}
              >
                <h2> {list.title} </h2>
                <p>
                  Category -
                  <span
                    style={{
                      textTransform: "capitalize",
                      marginLeft: "0.5rem",
                      color: "#f00",
                    }}
                  >
                    {list.category}
                  </span>
                </p>
                <hr />
                <p> Price: ${list.price} </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { query } = context;
  const { category } = query;
  const queryString = category ? `category=${category}` : "";
  console.log(queryString);
  const response = await fetch(`http://localhost:4000/product?${queryString}`);
  const data = await response.json();

  // Why I have used this querystring in the previous line on serversideprops? I can filter the item, and set the route in the filterCategory function, then why i did that?

  //! Ans: Because, if i have the query and reload the page, it will not show the filteredItem. It will show all the item. If we want to show other's that filtered item, then it will not work if we only use "/product". That's why we used this queryString, if there is a query, then load the data on the basis of query.

  return {
    props: {
      products: data,
    },
  };
};

export default Product;
