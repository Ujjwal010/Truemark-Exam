import React from "react";
import { useState, memo, useEffect } from "react";
function Product() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    fetch("https://product-fhqo.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProduct(data.products));
  }, []);

  /*const items = [];
  for (let i = 0; i < product.length; i++) {
    items.push(
      <tr>
        <td>{product[i].product_name}</td>
        <td>{product[i].category_name}</td>
        <td>{product[i].description}</td>
        <td>{product[i].updated_at}</td>
        <td>{product[i].status}</td>
        <td>
          <button
            onClick={() => {
              productEdit(product[i].id);
            }}
          >
            edit
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              productDelete(product[i].id);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    );
  }
  */
  function productFetch() {
    fetch("https://product-fhqo.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProduct(data.products))
      .then(() => setSearch(""))
      .catch((err) => {
        console.log("error", err);
      });
  }
  function productDelete(id) {
    console.log(id);
    fetch(`https://product-fhqo.onrender.com/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  function productEdit(id) {
    console.log(id);
    fetch(`https://product-fhqo.onrender.com/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        product_name: "banana",
        category_name: "dairy",
        created_by: "fruit shop",
        status: "in_stock",
        description: "banana is healthy fruit",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
  return (
    <div>
      <h1>CRUD OPERATION{console.log(product)}</h1>
      <span>
        <button>Add-Product</button>
        <button onClick={productFetch}>All-Product</button>
        <input
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </span>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {search === ""
            ? product.map((i) => (
                <tr key={i.id}>
                  <td>{i.product_name}</td>
                  <td>{i.category_name}</td>
                  <td>{i.description}</td>
                  <td>{i.updated_at}</td>
                  <td>{i.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        productEdit(i.id);
                      }}
                    >
                      edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        productDelete(i.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
            : product
                .filter((i) => {
                  return search.toLowerCase() === ""
                    ? i
                    : i.product_name.toLowerCase().includes(search) ||
                        i.category_name.toLowerCase().includes(search);
                })
                .map((i) => (
                  <tr key={i.id}>
                    <td>{i.product_name}</td>
                    <td>{i.category_name}</td>
                    <td>{i.description}</td>
                    <td>{i.updated_at}</td>
                    <td>{i.status}</td>
                    <td>
                      <button
                        onClick={() => {
                          productEdit(i.id);
                        }}
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          productDelete(i.id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(Product);
