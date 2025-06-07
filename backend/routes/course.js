const express = require("express");
const Course = require("../models/Course");
const middleware = require("../middleware/authMiddleware");
const router = express.Router();

// Students - view all courses
router.get("/student/courses", middleware, async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "fullname");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Students - view enrolled courses
router.get("/student/courses/enrolled", middleware, async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id }).populate(
      "instructor",
      "fullname"
    );
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled courses", error });
  }
});

// Students - view a single course
router.get("/student/courses/:id", middleware, async (req, res) => {
  try {
    const student_course = await Course.findById(req.params.id).populate(
      "instructor",
      "fullname"
    );
    if (!student_course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(student_course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
});

// Students - enroll in a course
router.post("/student/courses/:id/enroll", middleware, async (req, res) => {
  try {
    const enroll_course = await Course.findById(req.params.id);
    if (!enroll_course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (enroll_course.students.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }
    enroll_course.students.push(req.user.id);
    await enroll_course.save();
    res
      .status(200)
      .json({ message: "Enrolled successfully", course: enroll_course });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course", error });
  }
});

// Instructors - create a course
router.post("/instructor/add", middleware, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const { name, image, description, content } = req.body;
    const add_course = new Course({
      name,
      image,
      description,
      content,
      instructor: req.user.id,
    });
    await add_course.save();
    res
      .status(201)
      .json({ message: "Course created successfully", course: add_course });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
});

//Instructors - view all courses
router.get("/instructor/courses", middleware, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const instructor_courses = await Course.find({
      instructor: req.user.id,
    }).populate("instructor", "fullname");
    res.status(200).json(instructor_courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});

// Instructors - update a course
router.put("/instructor/update/:id", middleware, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    Object.assign(course, req.body);
    course.updatedAt = Date.now();
    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
});

// Instructors - see enrolled student details for each course
router.get("/instructor/courses/:id/students", middleware, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const course = await Course.findById(req.params.id).populate(
      "students",
      "fullname email"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course.students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching enrolled students", error });
  }
});

// Instructors - delete a course
router.delete("/instructor/delete/:id", middleware, async (req, res) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied" });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own courses" });
    }
    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
});

module.exports = router;
