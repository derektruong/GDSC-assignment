import React from "react";

const FormContext = React.createContext({
	sections: [],
    questions: [],
	resetSections: () => {},
	resetQuestions: (index) => {},
	setIsValidByIndex: (index, isValid) => {},
	setValueByIndex: (index, value) => {},
	checkFormValid: () => {},
	updateQuestionsToSections: (index) => {},
});

export default FormContext;