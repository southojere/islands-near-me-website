import React from "react";
import { Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { withFormik } from "formik";
import * as yup from "yup";

import Modal from "../../../../components/Modal";
import { FormItem, LocationWrapper, LocationLabel, Disclaimer } from "./styles";
import { EnvironmentOutlined } from "@ant-design/icons";

import { getUser } from "../../../../helpers/local-storage";
import { findUsersSession } from "../../../../helpers/graphql/session";

const SessionModal = ({ onCancel, onComplete, opened, ...formikProps }) => {
  const [fetchingLocation, setFetchingLocation] = React.useState(false);
  const {
    setFieldValue,
    handleSubmit,
    errors,
    values,
    isSubmitting
  } = formikProps;
  const { dodoCode, note } = values;

  const fetchLocation = () => {
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

  const RenderModelBody = () => {
    return (
      <>
        <FormItem
          required
          hasFeedback
          extra={errors.dodoCode}
          validateStatus={!!errors.dodoCode ? "error" : ""}
        >
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
        <LocationWrapper onClick={fetchLocation}>
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
    <Modal
      title={"Create Session"}
      component={() => RenderModelBody()}
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
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    dodoCode: "",
    note: "",
    coords: {
      latitude: "",
      longitude: ""
    }
  }),
  validationSchema: yup.object().shape({
    dodoCode: yup.string().required("Please enter your Dodo Code"),
    note: yup.string(),
    coords: yup
      .object()
      .shape({
        latitude: yup.string().required(),
        longitude: yup.string().required()
      })
      .required("Location is required")
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    setSubmitting(true);
    const currentUser = getUser();
    const session = await findUsersSession(currentUser.id);
    if (session) {
      // TODO: display message saying they have to close their current session
      return;
    }
    // await API.graphql(
    //   graphqlOperation(createSession, {
    //     input: {
    //       dodoCode: values.dodoCode,
    //       note: values.note,
    //       sessionHostId: currentUser.id,
    //       hostUserId: currentUser.id,
    //       latitude: parseFloat(values.coords.latitude),
    //       longitude: parseFloat(values.coords.longitude)
    //     }
    //   })
    // );
    if (props.onComplete) props.onComplete();
    setSubmitting(false);
  }
})(SessionModal);
