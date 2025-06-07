const express = require("express");
const { getCourseRecommendations } = require("../utils/chatService");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");
const Course = require("../models/Course");

// Chat - get course recommendations based on user input
router.post("/recommendations", middleware, async (req, res) => {
  const userInput = req.body.input;

  if (!userInput) {
    return res.status(400).json({ message: "Input is required" });
  }

  try {
    // Get course recommendations from the chat service
    const recommendations = await getCourseRecommendations(userInput);
    const regexArray = recommendations.flatMap((course) => [
      { name: { $regex: course, $options: "i" } },
      { description: { $regex: course, $options: "i" } },
      { content: { $regex: course, $options: "i" } }, // search from name, description, and content
    ]);
    const recommendedCourses = await Course.find({ $or: regexArray }).limit(10); // Limit to 10 results
    res.status(200).json({ recommendations: recommendedCourses });
    console.log(recommendations);
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({ message: "Failed to fetch course recommendations" });
  }
});

module.exports = router;
