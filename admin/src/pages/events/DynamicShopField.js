import React, { useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";

import style from "./Events.module.css";
import { customFieldregex } from "../../utils/regexes";

// ==========================================================================================

const DynamicShopField = ({ index, control, errors, register }) => {
  const [dynamicEventLabelsList, setDynamicEventLabelsList] = useState([
    { label: "Stall Number", value: "stallNo" },
    { label: "Area Number", value: "areaNo" },
    { label: "Sector", value: "sector" },
  ]);

  const [dynamicLabelValue, setDynamicLabelValue] = useState({
    label: "Stall Number",
    value: "stallNo",
  });
  const [showAddCustomLabelField, setShowAddCustomLabelField] = useState(false);
  const [customLabelName, setCustomLabelName] = useState("");

  return (
    <>
      <Col sm={12} md={2}>
        <label htmlFor="venue" className="form-label fw-bold">
          Select Label
        </label>
        <Controller
          name={`shopDetails.${index}.customLabel`}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              options={dynamicEventLabelsList}
              defaultValue={{
                label: "Stall Number",
                value: "stallNo",
              }}
              onChange={(val) => {
                onChange(val);
                setDynamicLabelValue(val);
              }}
              value={
                value
                  ? value
                  : {
                      label: "Stall Number",
                      value: "stallNo",
                    }
              }
            />
          )}
          rules={{ required: true }}
        />

        {errors.dynamicLabel && (
          <span className="text-danger">Please select dynamic label value</span>
        )}
      </Col>
      <Col
        sm={12}
        md={1}
        className="d-flex justify-content-center  align-items-center mt-3"
      >
        <Button
          variant="success"
          className="btn-md"
          title="Add New Custom Label in List"
          onClick={() => setShowAddCustomLabelField(true)}
        >
          Add +
        </Button>
      </Col>

      <Col sm={12} md={3}>
        <Form.Group className="mb-3" controlId="customLabelValue">
          <Form.Label>{dynamicLabelValue?.label}</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Enter ${dynamicLabelValue?.label}`}
            {...register(`shopDetails.${index}.customLabelValue`, {
              required: {
                value: true,
                message: `${dynamicLabelValue?.label} is required`,
              },
              pattern: {
                value: customFieldregex,
                message: `${dynamicLabelValue?.label} is invalid`,
              },
              minLength: {
                value: 1,
                message: `${dynamicLabelValue?.label}cannot be less than 1 character.`,
              },
              maxLength: {
                value: 50,
                message: `${dynamicLabelValue?.label} cannot be more than 50 characters.`,
              },
            })}
          />
          <span className="fw-normal fs-6 text-danger">
            {errors?.shopDetails?.[index]?.dynamicLabelValue?.label?.message}
          </span>
        </Form.Group>
      </Col>
      <Col sm={12} md={6}></Col>

      {showAddCustomLabelField && (
        <>
          <Col sm={12} md={4}>
            <Form.Group className="mb-3" controlId="hallNumber">
              <Form.Label>Add New Custom Label</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add New Custom Label"
                value={customLabelName}
                onChange={(e) => setCustomLabelName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col
            sm={12}
            md={1}
            className="d-flex justify-content-center  align-items-center mt-2"
          >
            <Button
              variant="primary"
              className="btn-md"
              title="Add New Custom Label in List"
              onClick={(e) => {
                setDynamicEventLabelsList([
                  ...dynamicEventLabelsList,
                  {
                    label: customLabelName,
                    value: customLabelName,
                  },
                ]);
                toast.success(
                  "Custom Label Successfully Added in Labels List",
                  {
                    position: "bottom-center",
                  }
                );
                setCustomLabelName("");
                setShowAddCustomLabelField(false);
              }}
            >
              Add +
            </Button>
          </Col>
          <Col
            sm={12}
            md={1}
            className="d-flex justify-content-center  align-items-center mt-2"
          >
            <Button
              variant="warning"
              className="btn-md"
              title="Delete Item"
              onClick={() => setShowAddCustomLabelField(false)}
            >
              Cancel
            </Button>
          </Col>
        </>
      )}
    </>
  );
};

export default DynamicShopField;
