import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashboard from "./components/studentDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InstructorDashboard from "./components/InstructorDashboard";
import MyCourses from "./components/MyCourses";
import CourseDetails from "./components/CourseDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
