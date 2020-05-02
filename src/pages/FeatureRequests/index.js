import React from "react";
import { PageWrapper, SizedBox, FeedBackTextArea, FeedbackSubmitButton } from "./style";
import {  Radio } from "antd";
const FeatureRequests = () => {
  const [type, setType] = React.useState(null);
  return (
    <PageWrapper>
      <h3>Feature Requests</h3>
      <FeedBackTextArea
        rows={6}
        placeholder="Please let us know what you think, any feedback, or any improvement we can make."
      />
      <SizedBox />
      <Radio.Group
        onChange={({ target: { value } }) => {
          console.log(value);
          setType(value);
        }}
        value={type}
      >
        <Radio value={1}>Improvement</Radio>
        <Radio value={2}>Feedback</Radio>
        <Radio value={3}>Issue</Radio>
        <Radio value={4}>Help</Radio>
      </Radio.Group>
      <SizedBox />
      <FeedbackSubmitButton type="primary">
        Send
      </FeedbackSubmitButton>
    </PageWrapper>
  );
};

export default FeatureRequests;
