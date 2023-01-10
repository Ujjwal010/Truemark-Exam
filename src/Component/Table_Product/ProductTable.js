import React, { memo } from "react";
import { Table } from "react-bootstrap";
import EditProduct from "../Edit_Product/EditProduct";
import DeleteProduct from "../Delete_Product/DeleteProduct";
import moment from "moment/moment";

function ProductTable(props) {
  return (
    <div>
      <Table responsive="md" striped>
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
          {props.productVal
            .filter((i) => {
              return props.searchVal.toLowerCase() === ""
                ? i
                : i.product_name.toLowerCase().includes(props.searchVal) ||
                    i.category_name.toLowerCase().includes(props.searchVal);
            })
            .map((i) => (
              <tr key={i.id}>
                <td>{i.product_name}</td>
                <td>{i.category_name}</td>
                <td>{i.description}</td>
                <td>{moment(i.created_at).format("YYYY-MM-DD")}</td>
                <td>{i.status}</td>
                <td>
                  <EditProduct id={i.id} />
                </td>
                <td>
                  <DeleteProduct id={i.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default memo(ProductTable);
