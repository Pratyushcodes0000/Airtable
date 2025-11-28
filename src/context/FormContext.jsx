import React, { createContext, useContext, useState } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [baseId, setBaseId] = useState(null);
  const [tableId, setTableId] = useState(null);
  const [fields, setFields] = useState([]);             // fields from Airtable
  const [selectedFields, setSelectedFields] = useState([]); // fields chosen for form
  const [questions, setQuestions] = useState([]);       // final questions structure

  const resetForm = () => {
    setBaseId(null);
    setTableId(null);
    setFields([]);
    setSelectedFields([]);
    setQuestions([]);
  };

  return (
    <FormContext.Provider
      value={{
        baseId,
        tableId,
        fields,
        selectedFields,
        questions,
        setBaseId,
        setTableId,
        setFields,
        setSelectedFields,
        setQuestions,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormBuilder = () => useContext(FormContext);
