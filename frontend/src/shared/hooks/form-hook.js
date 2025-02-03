import React ,{ useCallback, useReducer }from "react";

//When we update state state inside a custom hook, the component using our Custom Hook is also re rendered


//Reducer Function for managing state of Entire form
const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
  
        //Going through every input in the form
        //Even if one input is Invalid the whole form becomes invalid
        for (const iteratingInputId in state.inputs) {
          if(!state.inputs[iteratingInputId]){
            continue;
          }
          //If Id of Input matches the id of input which is changed
          if (iteratingInputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } //If Id does not match the input which is changed
          else {
            formIsValid = formIsValid && state.inputs[iteratingInputId].isValid;
          }
        }
  
        return {
          ...state,
          inputs: {
            ...state.inputs,
            //action.inputId is the id which is changed and sent through dispatch function so here it is written as dynamic value between []
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
    case 'SET_DATA':{
        return {
            inputs:action.inputs,
            isValid:action.isValid
        };
    }

      default:
        return state;
    }
  };


export const useForm = (initialInputs,initialFormValidity) =>{
    const [formState, dispatch] = useReducer(formReducer, {
        //inputs stores data about validity of individual input which is passed though useForm hook
        inputs: initialInputs,
        //isValid in initial state shows validity of entire form which is passed through useForm Hook
        isValid: initialFormValidity
      });

  //When we call below Function in Input.js in useEffect Hook,if it changes anything in NewPlace component Then the Below Function would
  //rendered again which is a dependency in useEffect Hook,So Function would be called again
  //This would lead to infinite loop.So to Prevent that the Callback function is used on this function, so it is cached and stored and it would not be re-rendered again when component is re-rendered
  const inputHandler = useCallback((id, value, isValid) => {
    //Dispatch Function which calls reducer function
    //Input Handler handles the validity of form when the input changes
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const setFormData = useCallback((inputData,formValidity) =>{
    dispatch({
        type:'SET_DATA',
        inputs:inputData,
        formIsValid:formValidity
    });
  },[])

  return [formState,inputHandler,setFormData];

};