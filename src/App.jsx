import React from "react";
import Login from "./Pages/LoginPage";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { FormProvider } from "./context/FormContext";
import OAuthCallback from "./OAuthCallback";
import BaseSelectorPage from "./Pages/BaseSelectorPage";
import TableSelectorPage from "./Pages/TableSelectorPage";
import FieldSelectorPage from "./Pages/FieldSelectorPage";
import FormBuilderPage from "./Pages/FormBuilderPage";
import Dashboard from "./Pages/Dashboard";
import ViewFormDetails from "./Pages/ViewFormDetails";
import FormFill from "./Pages/FormFill";

const App = () => {
  return <div>
    <AuthProvider>
      <FormProvider>
        <BrowserRouter>
          <Routes>
              {/* Landing / Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route path="/dashboard" element={<Dashboard />} />

            
            {/* Airtable Selection Steps */}
            <Route path="/select-base" element={<BaseSelectorPage />} />
            <Route path="/select-table/:baseId" element={<TableSelectorPage />} />
            <Route
              path="/select-fields/:baseId/:tableId"
              element={<FieldSelectorPage />}
            />
            <Route path="/dashboard" element={<Dashboard />}/>

            <Route path="/builder/:formId" element={<FormBuilderPage />} />
           
            <Route path="/form/:formId" element={<ViewFormDetails />} />

            <Route path="/forms/:formId/responses" element={<FormFill />} />
                {/* Preview Form */}
            {/* <Route path="/preview/:formId" element={<FormPreviewPage />} /> */}

            {/* Responses */}
             {/* <Route
              path="/responses/:formId"
              element={<ResponseListPage />}
            /> */}

              {/*
             <Route
              path="/response/:responseId"
              element={<ResponseDetailsPage />}
            /> */}

            
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </AuthProvider>
  </div>;
};

export default App;
