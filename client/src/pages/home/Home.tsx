import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React from "react";

const Home = () => {
  return (
    <>
      <Container
        disableGutters
        sx={{
          display: "flex",
          // border: "1px solid black"
        }}
      >
        <Container
          sx={{
            border: "1px solid black",
            height: "100vh",
            pt: "5%",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Container
            sx={{
              //   border: "2px solid",
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              mb: "20px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                // border: "2px solid",
                fontWeight: 900,
              }}
            >
              Get dental care from the comfort of your home
            </Typography>
          </Container>
          <Container
            sx={{
              //   border: "2px solid",
              display: "flex",
              justifyContent: "center",
              width: { xs: "100%", sm: "60%" },
            }}
          >
            <Typography variant="body1" align="center">
              Connect with experienced dentists online and receve personalised
              dental advice and treatment plan
            </Typography>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default Home;
