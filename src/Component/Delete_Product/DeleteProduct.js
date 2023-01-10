import React, { memo, useContext } from "react";
import { Button } from "react-bootstrap";
import { messageContext, productFetchContext } from "../Home/Product";

function DeleteProduct(props) {
  const setMessage = useContext(messageContext);
  const productFetch = useContext(productFetchContext);

  function productDelete() {
    fetch(`https://product-fhqo.onrender.com/products/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json;charset=UTF-8 ",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not edit the product please try again.");
        }
        return response.json();
      })
      .then(() => productFetch())
      .then(() => {
        setMessage({
          variant: "success",
          heading: "SUCCESS",
          message: "successfull product edited",
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Button variant="danger" onClick={productDelete}>
        Delete
      </Button>
    </>
  );
}

export default memo(DeleteProduct);
