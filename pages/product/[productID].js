import Link from "next/link";
import React from "react";

const ProductItem = ({ productItem }) => {
  return (
    <div>
      <Link href="/product"> Back to Product</Link>
      <h2> {productItem.title} </h2>
      <p> Category: {productItem.category} </p>
      <p> {productItem.description} </p>
      <h4> Price: ${productItem.price} </h4>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;
  console.log(params);

  const response = await fetch(
    `http://localhost:4000/product/${params.productID}`
  );
  const data = await response.json();

  return {
    props: {
      productItem: data,
    },
  };
};

export default ProductItem;
