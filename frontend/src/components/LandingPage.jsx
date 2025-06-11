import { Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('/landing2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(25, 30, 50, 0.65)",
          zIndex: -9000,
        }}
      />
      <Container sx={{ position: "relative", zIndex: 2, mt: -10 }}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "bold",
            textShadow: "0 4px 24px rgba(0,0,0,0.7)",
          }}
        >
          Welcome to Our Learning Portal
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            marginTop: "10px",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            fontWeight: "500",
            fontSize: "30px",
          }}
        >
          Start your learning journey now
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            marginTop: "100px",
            padding: "10px 30px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.2rem",
            borderRadius: 3,
            boxShadow: `
                0 4px 24px 0 rgba(49, 66, 134, 0.25),
                0 0 12px 2px rgb(67, 79, 187),
                0 2px 8px 0 rgba(0,0,0,0.18)
    `,
            "&:hover": {
              backgroundColor: "#154fa6",
              boxShadow: `
                0 8px 32px 0 rgba(25,30,50,0.35),
                0 0 18px 4px rgb(30, 73, 138),
                0 4px 16px 0 rgba(0,0,0,0.22)
      `,
            },
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
