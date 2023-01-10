import React, { memo, useContext } from "react";
import { Button } from "react-bootstrap";
import { productFetchContext } from "../Home/Product";

function FetchProduct() {
  const productFetch = useContext(productFetchContext);

  return (
    <>
      <Button variant="primary" className="btn-product" onClick={productFetch}>
        All Product
      </Button>
    </>
  );
}
export default memo(FetchProduct);
