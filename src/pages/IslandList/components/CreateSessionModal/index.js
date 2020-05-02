import React from "react";
import { Input, Button, Alert } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import TextArea from "antd/lib/input/TextArea";
import { message } from "antd";
import { Formik } from "formik";
import * as yup from "yup";

import Modal from "../../../../components/Modal";
import { FormItem, LocationWrapper, LocationLabel, Disclaimer } from "./styles";
import { EnvironmentOutlined } from "@ant-design/icons";

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
        }
      }}
      validationSchema={() =>
        yup.object().shape({
          dodoCode: yup.string().required("Please enter your Dodo Code"),
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
        setSubmitting(true);
        createSession({
          variables: {
            input: {
              note: values.note,
              dodoCode: values.dodoCode,
              latitude: `${values.coords.latitude}`,
              longitude: `${values.coords.longitude}`
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
// ({

//   handleSubmit: async (values, { setSubmitting, props }) => {
//     setSubmitting(true);
//     const currentUser = getUser();
//     const session = await findUsersSession(currentUser.id);
//     if (session) {
//       // TODO: display message saying they have to close their current session
//       return;
//     }
//     // await API.graphql(
//     //   graphqlOperation(createSession, {
//     //     input: {
//     //       dodoCode: values.dodoCode,
//     //       note: values.note,
//     //       sessionHostId: currentUser.id,
//     //       hostUserId: currentUser.id,
//     //       latitude: parseFloat(values.coords.latitude),
//     //       longitude: parseFloat(values.coords.longitude)
//     //     }
//     //   })
//     // );
//     if (props.onComplete) props.onComplete();
//     setSubmitting(false);
//   }
// })(SessionModal);
