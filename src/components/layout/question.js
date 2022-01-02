import React from 'react';
import _ from 'lodash';
import ShortText from '../form-control/short-text';
import LongText from '../form-control/long-text';
import Number from '../form-control/number';
import RadioControl from '../form-control/radio';

const Question = (props) => {
  const questions = props.questions ? props.questions : [];

  const formQuestions = questions.map((question, index) => {
    const questionType = _.get(question, 'type', '');
    switch (questionType) {
      case 'SHORT_TEXT':
        return <ShortText key={index} question={question} index={index} />;
      case 'LONG_TEXT':
        return <LongText key={index} question={question} index={index} />;
      case 'NUMBER':
        return <Number key={index} question={question} index={index} />;
      case 'RADIO':
        return <RadioControl key={index} question={question} index={index} />;
      default:
        break;
    }
    return null;
  });

  return <React.Fragment>{formQuestions}</React.Fragment>;
};

export default Question;
