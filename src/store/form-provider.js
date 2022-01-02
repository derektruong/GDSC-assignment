import React, { useState } from 'react';
import FormContext from './form-context';

const FormContextProvider = (props) => {
  let [sections, setSections] = useState([]);
  let [questions, setQuestions] = useState([]);

  const resetSections = (listSection) => {
    setSections(listSection);
  };

  const resetQuestions = (index) => {
    if (sections[index].questions.length > 0) {
      const newQuestions = sections[index].questions.map((question) => {
        if (question.isValid && question.value) {
          return question;
        } 

        return {
          ...question,
          isValid: ['NUMBER', 'RADIO'].includes(question.type) ? true : false,
          value: question.defaultAnswer ? question.defaultAnswer.toString() : '',
        }
      });

      setQuestions(newQuestions);
    }
  };

  const setIsValidByIndex = (index, isValid) => {
    const newQuestions = questions;
    if (newQuestions[index]) {
      newQuestions[index] = {
        ...newQuestions[index],
        isValid,
      };
      setQuestions(newQuestions);
    }
  };

  const setValueByIndex = (index, value) => {
    const newQuestions = questions;
    if (newQuestions[index]) {
      newQuestions[index] = {
        ...newQuestions[index],
        value,
      };
      setQuestions(newQuestions);
    }
  };

  const checkFormValid = (sectionOrderState) => {
    console.log(sectionOrderState);
    sections[sectionOrderState].questions = questions;
    console.log(JSON.stringify(sections[sectionOrderState].questions));
    const isFormValid = sections[sectionOrderState].questions.every((question) => {
      return question.isValid;
    });
    console.log('isFormValid', isFormValid);
    return isFormValid;
  };

  const updateQuestionsToSections = (index) => {
    sections[index].questions = questions;
  };

  const formContext = {
    sections,
    questions,
    resetSections,
    resetQuestions,
    setIsValidByIndex,
    setValueByIndex,
    checkFormValid,
    updateQuestionsToSections,
  };

  return (
    <FormContext.Provider value={formContext}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
