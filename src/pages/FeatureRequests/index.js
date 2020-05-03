import React from "react";
import { Radio, Form, Result } from "antd";
import { withFormik } from "formik";
import { gql } from "apollo-boost";
import { compose } from "recompose";
import * as yup from "yup";
import {
  PageWrapper,
  SizedBox,
  FeedBackTextArea,
  FeedbackSubmitButton
} from "./style";
import { withApollo } from "react-apollo";
import aboutIcon from "../../images/islandinfo.png";

const CREATE_FEEDBACK = gql`
  mutation($input: FeedbackInput!) {
    createFeedback(input: $input) {
      id
    }
  }
`;

const FeatureRequests = props => {
  // Formik props
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    status
  } = props;
  console.log(status);
  return (
    <PageWrapper>
      {status === "SUBMITTED" && (
        <Result
          icon={<img src={aboutIcon} alt="About"></img>}
          title="Thanks for the feedback!"
        />
      )}
      {!status && (
        <>
          <h3>Feature Requests</h3>
          <Form.Item
            hasFeedback
            errors
            validateStatus={!!errors.text ? "error" : ""}
            help={errors.text}
          >
            <FeedBackTextArea
              value={values.text}
              onChange={({ target: { value } }) => {
                setFieldValue("text", value);
              }}
              rows={6}
              placeholder="Please let us know what you think, any feedback, or any improvements we can make."
            />
          </Form.Item>
          <SizedBox />
          <Form.Item
            hasFeedback
            errors
            validateStatus={!!errors.ticketType ? "error" : ""}
            help={errors.ticketType}
          >
            <Radio.Group
              onChange={({ target: { value } }) => {
                setFieldValue("ticketType", value);
              }}
              value={values.ticketType}
            >
              <Radio value={"improvement"}>Improvement</Radio>
              <Radio value={"feedback"}>Feedback</Radio>
              <Radio value={"bug"}>Bug</Radio>
              <Radio value={"help"}>Help</Radio>
            </Radio.Group>
          </Form.Item>
          <SizedBox />
          <FeedbackSubmitButton
            type="primary"
            onClick={() => handleSubmit()}
            loading={isSubmitting}
          >
            Send
          </FeedbackSubmitButton>
        </>
      )}
    </PageWrapper>
  );
};

const enhanced = compose(
  withApollo,
  withFormik({
    mapPropsToValues: () => {
      return {
        text: "",
        ticketType: ""
      };
    },
    validateOnChange: false,
    validationSchema: () => {
      return yup.object().shape({
        text: yup.string().required("Please make sure you fill this out"),
        ticketType: yup.string().required("Please select a type")
      });
    },
    handleSubmit: (values, { setSubmitting, setStatus, props: { client } }) => {
      setSubmitting(true);

      client
        .mutate({
          mutation: CREATE_FEEDBACK,
          variables: {
            input: {
              message: values.text,
              feedbackType: values.ticketType
            }
          }
        })
        .then(() => {
          setSubmitting(false);
          setStatus("SUBMITTED");
        });
    }
  })
);

export default enhanced(FeatureRequests);
