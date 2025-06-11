import { Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register"); // Navigates to Register Page
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/path-to-your-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Welcome to Our Learning Portal
        </Typography>
        <Typography variant="h5" sx={{ color: "white", marginTop: "20px" }}>
          Start your learning journey now
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: "40px",
            padding: "10px 30px",
            backgroundColor: "#1976d2",
          }}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default LandingPage;
