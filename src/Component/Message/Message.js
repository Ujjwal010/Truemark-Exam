import React, { memo, useState } from "react";
import { Alert } from "react-bootstrap";

function Message(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={props.message.variant}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{props.message.heading}</Alert.Heading>
        <p>{props.message.message}</p>
      </Alert>
    );
  }
}

export default memo(Message);
