import React from "react";
import { Input, Button, Alert, Checkbox, Row, Col } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TextArea from "antd/lib/input/TextArea";
import { message } from "antd";
import { Formik } from "formik";
import * as yup from "yup";

import Modal from "../../../../components/Modal";
import {
  FormItem,
  LocationWrapper,
  LocationLabel,
  Disclaimer,
  VistorCheckBoxWrapper
} from "./styles";
import { EnvironmentOutlined } from "@ant-design/icons";
import { VISITORS } from "../../../../constants";

const CREATE_SESSION = gql`
  mutation($input: SessionInput!) {
    createSession(input: $input) {
      id
    }
  }
`;

const SessionModal = ({ onCancel, onComplete, opened, ...formikProps }) => {
  const [createSession] = useMutation(CREATE_SESSION);
  const [error, setError] = React.useState("");
  const [fetchingLocation, setFetchingLocation] = React.useState(false);

  const fetchLocation = setFieldValue => {
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      res => {
        const {
          coords: { latitude, longitude }
        } = res;
        setFieldValue("coords", {
          latitude,
          longitude
        });
        setFetchingLocation(false);
      },
      res => {
        setFetchingLocation(false);
      }
    );
  };

  const RenderModelBody = ({ dodoCode, note }, errors, setFieldValue) => {
    return (
      <>
        <FormItem
          required
          hasFeedback
          extra={errors.dodoCode}
          validateStatus={!!errors.dodoCode ? "error" : ""}
        >
          {error && (
            <Alert
              message={error}
              type={"error"}
              showIcon
              onClose={() => setError("")}
            />
          )}
          <br />
          <Input
            required
            type="text"
            placeholder="dodo code"
            value={dodoCode}
            onChange={({ target: { value } }) => {
              setFieldValue("dodoCode", value);
            }}
          />
        </FormItem>
        <br />
        <TextArea
          rows={3}
          placeholder="note"
          value={note}
          onChange={({ target: { value } }) => {
            setFieldValue("note", value);
          }}
        />
        <VistorCheckBoxWrapper>
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={myVisitors => {
              setFieldValue("visitors", myVisitors);
            }}
          >
            <Row>
              <Col span={8}>
                <Checkbox value={VISITORS.CELESTE.VALUE}>
                  {VISITORS.CELESTE.TEXT}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value={VISITORS.SAHARAH.VALUE}>
                  {VISITORS.SAHARAH.TEXT}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value={VISITORS.KICKS.VALUE}>
                  {VISITORS.KICKS.TEXT}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value={VISITORS.FLICK.VALUE}>
                  {VISITORS.FLICK.TEXT}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value={VISITORS.CJ.VALUE}>
                  {VISITORS.CJ.TEXT}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value={VISITORS.LEIF.VALUE}>
                  {VISITORS.LEIF.TEXT}
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value={VISITORS.REDD.VALUE}>
                  {VISITORS.REDD.TEXT}
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </VistorCheckBoxWrapper>
        <LocationWrapper onClick={() => fetchLocation(setFieldValue)}>
          <Button
            type="primary"
            shape="circle"
            icon={<EnvironmentOutlined />}
            loading={fetchingLocation}
          />
          <LocationLabel error={!!errors.coords}>
            Get my location *
          </LocationLabel>
        </LocationWrapper>
        <Disclaimer>
          To be able to find people near you we first need your location
        </Disclaimer>
      </>
    );
  };

  return (
    <Formik
      initialValues={{
        dodoCode: "",
        note: "",
        coords: {
          latitude: "",
          longitude: ""
        },
        visitors: []
      }}
      validationSchema={() =>
        yup.object().shape({
          dodoCode: yup.string().required("Please enter your Dodo Code"),
          visitor: yup.array(),
          note: yup.string(),
          coords: yup
            .object()
            .shape({
              latitude: yup.string().required(),
              longitude: yup.string().required()
            })
            .required("Location is required")
        })
      }
      onSubmit={(values, { setSubmitting, props }) => {
        createSession({
          variables: {
            input: {
              note: values.note,
              dodoCode: values.dodoCode,
              latitude: `${values.coords.latitude}`,
              longitude: `${values.coords.longitude}`,
              hasRedd: values.visitors.indexOf(VISITORS.REDD.VALUE) !== -1,
              hasLeif: values.visitors.indexOf(VISITORS.LEIF.VALUE) !== -1,
              hasCJ: values.visitors.indexOf(VISITORS.CJ.VALUE) !== -1,
              hasFlick: values.visitors.indexOf(VISITORS.FLICK.VALUE) !== -1,
              hasKicks: values.visitors.indexOf(VISITORS.KICKS.VALUE) !== -1,
              hasSaharah:
                values.visitors.indexOf(VISITORS.SAHARAH.VALUE) !== -1,
              hasCeleste: values.visitors.indexOf(VISITORS.CELESTE.VALUE) !== -1
            }
          }
        })
          .then(res => {
            message.success("Done!");
            if (onComplete) {
              onComplete();
            }
            setSubmitting(false);
          })
          .catch(e => {
            setError(e.toString());
            setSubmitting(false);
          });
      }}
    >
      {({ values, errors, isSubmitting, handleSubmit, setFieldValue }) => (
        <Modal
          title={"Create Session"}
          component={() => RenderModelBody(values, errors, setFieldValue)}
          actions={[
            <Button
              type="primary"
              block
              onClick={() => {
                handleSubmit();
              }}
              loading={isSubmitting}
            >
              Create
            </Button>
          ]}
          onCancel={onCancel}
          opened={opened}
          onSubmit={handleSubmit}
        />
      )}
    </Formik>
  );
};

export default SessionModal;
