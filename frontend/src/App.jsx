import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import StudentDashboard from "./components/studentDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import MyCourses from "./components/MyCourses";
import CourseDetails from "./components/CourseDetails";
import CourseStudents from "./components/CourseStudents";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Student Protected Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />

        {/* Instructor Protected Routes */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/my-students/:id"
          element={
            <ProtectedRoute allowedRoles={["instructor"]}>
              <CourseStudents />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
