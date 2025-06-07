const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getCourseRecommendations(userInput) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that recommends courses to students. Extract keywords or subjects from the user's input that can be used to search course database. Respond with a comma-separated list of relevant courses only.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    const content = chatCompletion?.choices?.[0]?.message?.content; // Access content of the first choice

    if (!content) {
      console.error("Invalid response from OpenAI:", chatCompletion);
      throw new Error("No content returned by OpenAI");
    }

    // Extract keywords from the content
    const keywords = content
      .split(/,|\n|---|:/)
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    return keywords;
  } catch (err) {
    console.error("Error fetching course recommendations:", err);
    throw new Error("Failed to fetch course recommendations");
  }
}

module.exports = { getCourseRecommendations };
