import React from "react";
import { PageWrapper, Disclaimer } from "./style";
import Collapse from "../../components/Collapse";
const About = () => {
  return (
    <PageWrapper>
      <Collapse
        title="About The App"
        body={
          <div>
            <p>
              Built for fun and with love{" "}
              <span role="img" aria-label="love icon">
                💖
              </span>{" "}
              This app was developed and maintained by southojere
            </p>
            <p>
              Images on this app was gathered from this{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit?usp=sharing"
                title="https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/edit?usp=sharing"
              >
                spread sheet
              </a>
            </p>
            <br />
            <p>
                Want to add a new app/feature? Send us an email or submit a request on the request page.
            </p>
            <br />
            <Disclaimer>
              All images used in the app belong to Nintendo
            </Disclaimer>
            <br />
          </div>
        }
      />
      <br />
      <Collapse
        title="Privacy Policy"
        body={
          <div>
            <p>
              <b>User Accounts</b>
            </p>
            <p>
              When creating an account on this website, we collect your email
              address for verification purposes. If you would like to delete
              your account, please do so by logging in, and deleting your
              account. Your account information will be deleted from our server
              (including your email address).
            </p>
            <br />
            <p>
              <b>Geolocation Information</b>
            </p>
            <p>
              With your permission we will request access to your device
              location information specifically your longitude and latitude this
              will be used to help find players nearby you. This information
              helps us identify your physical location and we may use it to
              personalize the App and make it easier for you to interact with
              other Users.
            </p>
          </div>
        }
      />
      <br />
      <Collapse
        title="Contact Us"
        body={
          <div>
            <p>
              Feel free to contact me with any enquires at{' '}
              <u>islandsnearme@gmail.com</u>
            </p>
          </div>
        }
      />
    </PageWrapper>
  );
};

export default About;
