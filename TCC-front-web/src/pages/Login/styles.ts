import styled from "styled-components";

export const Container = styled.div`
  .content-photo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content-form {
    background-color: rgba(58, 156, 127, 0.7);

    .form {
      background-color: rgba(58, 156, 127, 1);

      button {
        color: rgba(58, 156, 127, 1);
      }

      label {
        color: #fff;
      }

      p {
        color: #fff;
      }
    }
  }
`;