import { Route, Routes } from "react-router";
import "./App.css";
import MainLayout from "./components/common/MainLayout";
import SectionEditorList from "./components/edit/SectionEditorList";
import { SurveyStoreProvider } from "./store";
import AdminPage from "./pages/AdminPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <SurveyStoreProvider>
          <Routes>
            <Route path="/surveys/:surveyId" element={<AdminPage />}>
              <Route path="edit" element={<SectionEditorList />} />
              <Route path="responses" element={<div>응답</div>} />
            </Route>
          </Routes>
        </SurveyStoreProvider>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
