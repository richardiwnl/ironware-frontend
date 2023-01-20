import styled from 'styled-components';

export const GForm = styled.form`
  display: flex;
  flex-direction: column;

  .parent {
    display: flex;
    flex-direction: row;
  }

  .firstChild {
    width: 50%;
    margin-right: 20px;
  }

  .secondChild {
    width: 50%;
  }

  .long {
    width: 100%;
  }
`;

export const FormTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

export const FormControl = styled.div`
  margin-top: 10px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  outline: none;
  border: 1px solid #bbb;
  width: 100%;
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
`;

export const FormButton = styled.button`
  font-family: inherit;
  outline: none;
  border: none;
  background: none;
  letter-spacing: inherit;
  color: inherit;
  font-size: inherit;
  text-align: inherit;
  padding: 0;

  width: 100%;
  background-color: black;
  color: white;
  padding: 5px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
`;
