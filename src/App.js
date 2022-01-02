import React from 'react';
import Form from './components/layout/form';
import FormContextProvider from './store/form-provider';

function App() {
  return (
    <FormContextProvider className="App">
      <Form />
    </FormContextProvider>
  );
}

export default App;
