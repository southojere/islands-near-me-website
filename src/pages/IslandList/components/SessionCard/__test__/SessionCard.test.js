import React from "react";
import ReactDOM from "react-dom";
import { MockedProvider } from "@apollo/react-testing";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { SessionCard, DELETE_SESSION } from "../index";
import theme from "../../../../../styles/theme";

const mocks = [
  {
    request: {
      mutation: DELETE_SESSION,
      variables: {
        id: 1
      }
    },
    result: {
      data: { deleteSession: true }
    }
  }
];

const mockSessionData = {
  id: 1,
  note: "1000 Bell Entry fee",
  dodoCode: "JAS23",
  owner: {
    id: "10",
    username: "add",
    email: "add@test.com",
    __typename: "User"
  },
  createdAt: "1591225054568",
  isFull: false,
  isPrivate: true,
  visitors: {
    host: {
      id: "10",
      username: "add",
      email: "add@test.com",
      __typename: "User"
    },
    hostId: 10,
    latitude: "-33.868819699999996",
    longitude: "151.2092955",
    hasCeleste: true,
    hasSaharah: false,
    hasKicks: false,
    hasRedd: false,
    hasLeif: true,
    __typename: "Session"
  }
};

const SessionCardWrapper = (props={}) => (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={[]}>
      <SessionCard
        key={`session-card-${mockSessionData.id}`}
        id={mockSessionData.id}
        note={mockSessionData.note}
        dodoCode={mockSessionData.dodoCode}
        host={mockSessionData.hostId}
        refetch={() => {}}
        owner={mockSessionData.host}
        createdAt={mockSessionData.createdAt}
        {...mockSessionData}
        {...props}
      />
    </MockedProvider>
  </ThemeProvider>
);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(SessionCardWrapper(), div);
});

it("card renders correctly", () => {
  const { getByTestId } = render(<SessionCardWrapper />);

  expect(getByTestId("session-card-container")).toHaveTextContent("DODO CODE");
  expect(getByTestId("session-card-container")).toHaveTextContent(
    `Note: ${mockSessionData.note}`
  );
});

it("expect dodo code to be hidden", () => {
  const { getByTestId } = render(<SessionCardWrapper />);

  expect(getByTestId("session-card-container")).toHaveTextContent(
    "DODO CODE:Request"
  );
});

it("dodo code is displayed", () => {
  const { getByTestId } = render(<SessionCardWrapper isPrivate={false}/>);

  expect(getByTestId("session-card-container")).toHaveTextContent(
    "DODO CODE:JAS23"
  );
});
