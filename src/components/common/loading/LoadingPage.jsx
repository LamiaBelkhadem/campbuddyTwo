import { CircularProgress, Container, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        CampBuddy
      </Typography>

      <CircularProgress color="primary" size={60} />
    </Container>
  );
};

export default LoadingPage;
