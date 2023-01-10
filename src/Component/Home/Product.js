import "./Product.css";
import React, { useState, memo, useEffect, createContext } from "react";
import { Spinner } from "react-bootstrap";
import AddProduct from "../Add_Product/AddProduct";
import SearchProduct from "../Search_Product/SearchProduct";
import FetchProduct from "../Fetch_Product/FetchProduct";
import Message from "../Message/Message";
import ProductTable from "../Table_Product/ProductTable";

export const messageContext = createContext();
export const productFetchContext = createContext();

function Product() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({
    variant: "success",
    heading: "WELCOME",
    message: "Please, feel free to Add, Delete or Edit the Product",
  });

  function productFetch() {
    fetch("https://product-fhqo.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProduct(data.products))
      .then(() => setSearch(""))
      .catch((err) => {
        console.log("error", err);
      });
  }

  useEffect(() => {
    productFetch();
  }, []);

  return (
    <div>
      {product.length === 0 ? (
        <Spinner
          animation="border"
          role="status"
          style={{
            marginTop: "200px",
            marginBottom: "600px",
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <productFetchContext.Provider value={productFetch}>
            <messageContext.Provider value={setMessage}>
              <div className="product-message">
                <Message message={message} />
              </div>
              <div>
                <h1 className="product-title">CRUD OPERATION</h1>
                <div className="spam-header">
                  <span>
                    <AddProduct />
                    <FetchProduct />
                    <SearchProduct searchVal={search} searchFun={setSearch} />
                  </span>
                </div>
              </div>
              <ProductTable productVal={product} searchVal={search} />
            </messageContext.Provider>
          </productFetchContext.Provider>
        </div>
      )}
    </div>
  );
}

export default memo(Product);
