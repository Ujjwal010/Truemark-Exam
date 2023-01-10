import React, { useState, useContext, memo } from "react";
import { useFormik } from "formik";
import { Button, Modal, Form } from "react-bootstrap";
import { messageContext, productFetchContext } from "../Home/Product";

const validate = (values) => {
  const errors = {};
  if (!values.product_name) {
    errors.product_name = "Required";
  }
  if (!values.product_description) {
    errors.product_description = "Required";
  }

  if (!values.product_category) {
    errors.product_category = "Required";
  }
  if (!values.product_status) {
    errors.product_status = "Required";
  }

  return errors;
};

function EditProduct(props) {
  const setMessage = useContext(messageContext);
  const productFetch = useContext(productFetchContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_description: "",
      product_category: "",
      product_status: "",
    },
    validate,
    onSubmit: (values) => {
      fetch(`https://product-fhqo.onrender.com/products/${props.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          product_name: values.product_name,
          category_name: values.product_category,

          status: values.product_status,
          description: values.product_description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
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
          setMessage({
            variant: "danger",
            heading: "Failed",
            message: error.message,
          });
        });
      handleClose();
    },
  });
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                id="product_name"
                name="product_name"
                type="text"
                placeholder="enter product name"
                {...formik.getFieldProps("product_name")}
              />
              {formik.touched.product_name && formik.errors.product_name ? (
                <Form.Text className="text-muted">
                  {formik.errors.product_name}
                </Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                id="product_description"
                name="product_description"
                as="textarea"
                placeholder="enter product description"
                {...formik.getFieldProps("product_description")}
              />
              {formik.touched.product_description &&
              formik.errors.product_description ? (
                <Form.Text className="text-muted">
                  {formik.errors.product_description}
                </Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                id="product_category"
                name="product_category"
                aria-label="Default select example"
                {...formik.getFieldProps("product_category")}
              >
                <option value="">Category</option>
                <option value="dairy">dairy</option>
                <option value="electronic">electronic</option>
                <option value="furniture">furniture</option>
              </Form.Select>
              {formik.touched.product_category &&
              formik.errors.product_category ? (
                <Form.Text className="text-muted">
                  {formik.errors.product_category}
                </Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                id="product_status"
                name="product_status"
                aria-label="Default select example"
                {...formik.getFieldProps("product_status")}
              >
                <option value="">Status</option>
                <option value="in_stock">in_stock</option>
                <option value="limited_available">limited_available</option>
              </Form.Select>
              {formik.touched.product_status && formik.errors.product_status ? (
                <Form.Text className="text-muted">
                  {formik.errors.product_status}
                </Form.Text>
              ) : null}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(EditProduct);
