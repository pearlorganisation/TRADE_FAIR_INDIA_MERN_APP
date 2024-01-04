import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FetchEventBanners = () => {
  return <>
     <Container className="my-5">
     <Row className="mb-3">
       <Col xs="8" md="10">
            <h1 className="text-center text-danger">Event List </h1>
       </Col>
       <Col
            xs="4"
            md="2"
            className="d-flex align-items-center justify-content-end"
        >


          </Col>
      </Row>
     </Container>
    </>
};

export default FetchEventBanners;
