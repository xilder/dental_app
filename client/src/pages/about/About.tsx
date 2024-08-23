import React from "react";
import about from "../../images/about-us.jpg";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const About = () => {
  const appName = "Epitome";
  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ fontWeight: 900 }} gutterBottom>
          About us: {appName}
        </Typography>
        <Container
          sx={{
            backgroundImage: `url(${about})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: { xs: "90%", sm: "50%" },
            height: "70vh",
            borderRadius: "5px",
            mb: 5
          }}
        ></Container>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ducimus
          vero incidunt est, ex repellat similique assumenda vitae deleniti
          dolore repellendus, itaque fuga sequi quas aut non. Illum alias esse
          soluta dolores ullam, dolor repudiandae accusamus iusto, eius
          repellendus dicta officiis incidunt, totam quos commodi. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Suscipit, quia obcaecati
          animi excepturi optio voluptatum, a numquam, enim velit quae est eaque
          ut. Non consequatur et inventore cupiditate nobis vero asperiores
          error nulla ea. Iusto dicta quae, reiciendis accusantium dolorem
          maxime distinctio doloremque, nam quam autem provident quod et magni
          repellendus facere voluptate? Quos eligendi cupiditate explicabo
          placeat porro beatae mollitia, atque quae voluptate laudantium odit
          voluptatem maiores suscipit ipsa corporis sint dicta minus unde velit
          possimus, culpa aut ipsum? Dicta culpa perferendis numquam labore
          alias, suscipit quis laudantium iure eius qui nesciunt at odio itaque
          a tempore laboriosam, est autem adipisci. Nesciunt ducimus alias amet
          itaque, illo consectetur sapiente explicabo ratione! Modi asperiores
          tempora consectetur voluptatibus fugit libero ipsa aut cupiditate
          optio quasi, laudantium dolorum, unde, autem dolor esse quidem sed
          ratione! Laboriosam laborum omnis reiciendis ea, voluptatibus iusto
          aliquam excepturi fugiat debitis tenetur adipisci expedita corporis
          molestiae numquam, cumque inventore ducimus sequi modi sint possimus
          autem provident vero libero! Aliquid, sapiente reiciendis! Voluptatum
          commodi cupiditate ea sed dolor officia quia, iste sunt facere et
          dolorum libero consequuntur! Laudantium commodi, reprehenderit
          asperiores cupiditate aliquid accusantium ea impedit ex. Architecto
          tempora unde vitae
        </Typography>
      </Container>
    </>
  );
};

export default About;
