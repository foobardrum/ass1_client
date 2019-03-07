import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  &[disabled]{
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    padding-left: 0;
    margin-left: 0;
  }
  width: 100%;
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  display: block;
  width: 100%;
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const InputRow = (props) => {
        return(
            <div>
                <Label>{props.label}</Label>
                <InputField
                    value={props.value}
                    disabled = {props.disabled}
                    placeholder = {props.placeholder}
                    type={props.type}
                    onChange={e => {
                        props.handleInputChange(props.name, e.target.value);
                    }}
                />
            </div>
        )
};

export default InputRow;