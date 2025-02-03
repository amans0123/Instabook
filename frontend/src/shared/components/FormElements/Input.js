//Input Form for making new place

import React, { useReducer,useEffect } from "react";

import { validate } from "../util/validators";

import "./Input.css";

const inputReducer = (state, action) => {
  //We will switch depending on type property of action
  switch (action.type) {
    //Returning state if action type is Change
    case "CHANGE":
      return {
        ...state,
        value: action.val, //Changing value depending upon val through action(dispatch function)
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,  //Input is now Touched when dispatch function of type TOUCH is sent
      };
    default:
      return state;
  }
};

const Input = (props) => {
  //UseReducer takes two inputs which are Reducer Function and initial states and gives 2 Output as Current State and Dispatch Function
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",  //props.value signifies if the input already has some initial value which will be the case when we are updating forms
    isValid: props.initialValid || false,//Same logic as above for props.valid
    isTouched: false, //Initially Input is not touched
  });

  //Extracting Values using Object Destructuring
  const {id,onInput}=props;
  const {value,isValid}=inputState;

  //UseEffect performs side effects when any of the dependencies change
  //In Use Effect we have two inputs first is the function which is executed whenever any of dependencies change .Here Dependencies are the 2nd Input in useEffect
  //OnInput Function is executed but it is also a dependency in useEffect Hook
  useEffect(() =>{
    onInput(id,value,isValid)
  },[id,value,isValid,onInput]);

  const changeHandler = (event) => {
    //Dispatch function which calls Reducer Function to Change State
    //Dispatch Function also send prop like attributes which in this case is type,val,validators
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  //When Input is Touched Only Then Show invalid So to detect that touching this function is made
  //Giving User the chance to change input. If after Touching Input is invalid Show Error
  const touchHandler = () => {
    //TOUCH type dispatch function is sent when element loses focus
    dispatch({ type: "TOUCH" });
  };

  //Element which can be input tag or Text Area depending upon {props.id}=>data passed through props
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.row || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  {
    /*Value attribute is added to have two-way binding in the Input and TextArea Element */
  }

  //Given Below If Input is not Valid and Input is touched, Then Add form-control--invalid ClassName
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
      {/*if InputState is Not Valid and Input is Touched,Then Add ErrorText in form of paragraph */}
    </div>
  );
};

export default Input;
