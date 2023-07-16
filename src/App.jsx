import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import QuizPage from "./pages/QuizPage";
import QuizStartPage from "./pages/QuizStartPage";
import QuizEndPage from "./pages/QuizEndPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <h1>React Quiz App</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuizStartPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="quiz-end" element={<QuizEndPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
