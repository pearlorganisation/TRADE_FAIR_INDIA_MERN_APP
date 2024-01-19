import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import styles from "./Faq.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingButton from "../../../components/common/LoadingButton";

import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

import Select from "react-select";
import { useState } from "react";
import { addNewFaq, updateFaqDetails } from "../../../features/actions/faqActions";

const UpdateFaq = () => {
  const { faqData, isLoading } = useSelector((state) => state.faq);
  const {state} = useLocation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:{
      question:state?.question,
      answer: state?.answer
    }
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddFaq = (data) => {
    console.log("first", data);
    dispatch(updateFaqDetails({faqId:state?._id, payload:data}));
  };

  useEffect(() => {
    if (faqData?.status === "SUCCESS") {
      navigate("/client/faqs");
    }
  }, [faqData]);
  useEffect(() => {
    console.log("state::",state)
  }, [])
  

  return (
    <section>
      <Container className="mb-5">
        <Row>
          <Col className="p-0">
            <h2
              className={`text-center text-danger mb-3 py-2 ${styles.addExamCategoryTitle}`}
            >
              Update FAQ
            </h2>
          </Col>
        </Row>
        <form onSubmit={handleSubmit(handleAddFaq)}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Question
            </label>
            <input
              type="text"
              {...register("question", { required: true })}
              class="form-control"
              id="exampleInputEmail1"
            />
            {errors?.question && (
              <span className="text-danger">
                {errors?.question?.message || "This Field is required"}
              </span>
            )}
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Answer
            </label>
            <textarea
              {...register("answer", { required: true })}
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            {errors?.answer && (
              <span className="text-danger">
                {errors?.answer?.message || "This Field is required"}
              </span>
            )}
          </div>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </Container>
    </section>
  );
};



export default UpdateFaq;
