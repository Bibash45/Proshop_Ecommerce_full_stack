import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
const HomeScreen = (

) => {
  let products = [
    {
      _id: "1",
      name: "Airpods Wereless Bluethooth Headphones",
      image: "/images/airpods.jpg",
      description:
        "lorem5akhosdhoihjdao;jgd;osj;ajd;jaopjsdo;jf;ojdsa;ojsdoihgoia;dh",
      brand: "Apple",
      category: "Electronics",
      price: 89.9,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
    },
    {
      _id: "1",
      name: "Airpods Wereless Bluethooth Headphones",
      image: "/images/airpods.jpg",
      description:
        "lorem5akhosdhoihjdao;jgd;osj;ajd;jaopjsdo;jf;ojdsa;ojsdoihgoia;dh",
      brand: "Apple",
      category: "Electronics",
      price: 89.9,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
    },
    {
      _id: "1",
      name: "Airpods Wereless Bluethooth Headphones",
      image: "/images/airpods.jpg",
      description:
        "lorem5akhosdhoihjdao;jgd;osj;ajd;jaopjsdo;jf;ojdsa;ojsdoihgoia;dh",
      brand: "Apple",
      category: "Electronics",
      price: 89.9,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
    },
    {
      _id: "1",
      name: "Airpods Wereless Bluethooth Headphones",
      image: "/images/airpods.jpg",
      description:
        "lorem5akhosdhoihjdao;jgd;osj;ajd;jaopjsdo;jf;ojdsa;ojsdoihgoia;dh",
      brand: "Apple",
      category: "Electronics",
      price: 89.9,
      countInStock: 10,
      rating: 4.5,
      numReviews: 12,
    },
  ];
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
