import styled from "styled-components";
import { Modal } from "antd";

const sizes = {
  small: 343
};

const ModalWrapper = styled(Modal)`
  width: 100% !important;
  max-width: ${({ visual }) =>
    visual ? sizes[visual] : sizes.small}px!important;

  .ant-modal-header {
    border-radius: 35px;
    padding: 24px 24px;
    border-bottom: 0 !important;
    background-image: radial-gradient(#e5c142 2px, #fef0bc 2px),
      radial-gradient(#e5c142 2px, #fef0bc 2px);
    background-size: calc(20 * 2px) calc(20 * 2px);
    background-position: 0 0, calc(10 * 2px) calc(10 * 2px);
  }

  .ant-modal-close-x {
    display: none;
  }

  .ant-modal-body {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .ant-modal-title {
    font-size: 22px;
    line-height: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  .ant-modal-footer {
    border-top: none;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    div {
      display: flex;
      justify-content: space-between;
    }

    .ant-btn,
    input[type="button"],
    button {
      max-width: 132px;
      width: 100%;

      &:first-child {
        margin-right: 1rem;
      }
    }
  }

  .ant-modal-body {
    padding: 0 0 24px;
    font-size: 15px;
    line-height: 1.5;
    word-wrap: break-word;
    width: 81%;
    margin: 0 auto;
    border-radius: 25px;
  }

  ${({ hasComponent }) =>
    !hasComponent &&
    `
    .ant-modal-body {
      display: none;
    }
  `}

  .ant-modal-content {
    border-radius: 35px;
    background-image: radial-gradient(#e5c142 2px, #fef0bc 2px),
      radial-gradient(#e5c142 2px, #fef0bc 2px);
    background-size: calc(20 * 2px) calc(20 * 2px);
    background-position: 0 0, calc(10 * 2px) calc(10 * 2px);
  }
`;

export { ModalWrapper };
