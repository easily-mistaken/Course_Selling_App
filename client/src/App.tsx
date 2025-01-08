import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Courses from "./pages/Courses";
import CourseUpload from "./pages/CourseUpload";
import Purchases from "./pages/Purchases";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <Layout>
              <CourseUpload />
            </Layout>
          }
        />
        <Route
          path="/purchases"
          element={
            <Layout>
              <Purchases />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
