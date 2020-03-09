import styled from 'styled-components';

const InputContainer = styled.div`
  width: 100%;

  input {
    border: 1px solid #eee;
    border-radius: 20px;
    width: 100%;

    &::placeholder {
      padding: 0.5rem;
      font-size: 14px;
    };
  }
`;

export default InputContainer;
