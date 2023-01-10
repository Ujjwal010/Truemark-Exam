import React, { memo } from "react";

function SearchProduct(props) {
  return (
    <input
      type="text"
      placeholder="Search by name/category"
      value={props.searchVal}
      onChange={(e) => props.searchFun(e.target.value)}
      className="product-search"
    />
  );
}
export default memo(SearchProduct);
