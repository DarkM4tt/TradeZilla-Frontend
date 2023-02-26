import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadProductsBySell = () => {
    setLoading(true);
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setProductsBySell(data);
        setLoading(false);
      }
    });
  };

  const loadProductsByArrival = () => {
    setLoading(true);
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setProductsByArrival(data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="TradeZilla"
      description="React Node E-Commerce App"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>

      {loading ? (
        <p>Loading(Could take a minute to fetch from backend)...........</p>
      ) : (
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-4">Best Sellers</h2>
      {loading ? (
        <p>Loading(Could take a minute to fetch from backend)..........</p>
      ) : (
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
