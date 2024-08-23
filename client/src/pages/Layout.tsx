import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { homepageLinks } from "../constants/nav";
import { useTheme } from "@mui/material/styles";
import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [navMenu, setNavMenu] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  console.log(theme.mixins.toolbar);
  const openNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavMenu(event.currentTarget);
  };
  const closeNavMenu = () => {
    setNavMenu(null);
  };
  return (
    <>
      <AppBar
        // elevation={0}
        position="fixed"
        sx={{
          backgroundColor: "#234567",
          m: 0,
          p: 0,
          color: "white",
          // border: "1px solid green",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: { xs: "none", md: "flex" },
            mx: 3,
            // border: "1px solid red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              direction: "row",
              alignItems: "center",
              // border: "1px solid green",
            }}
          >
            <AdbIcon />
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: "1em" }}
            >
              EPITOME
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
              // border: "1px solid green",
              width: "auto",
            }}
          >
            {homepageLinks.map((link) => (
              <Button
                key={link.page}
                onClick={() => navigate(link.url)}
                sx={{
                  color: "white",
                }}
              >
                {link.page}
              </Button>
            ))}
          </Box>
        </Toolbar>
        <Toolbar
          disableGutters
          sx={{ display: { xs: "flex", md: "none" }, mx: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              direction: "row",
              flexGrow: 1,
              // border: "1px solid green",
            }}
          >
            <AdbIcon />
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: ".5em" }}
            >
              EPITOME
            </Typography>
          </Box>
          <Box>
            <Tooltip title="see other pages">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={navMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(navMenu)}
              onClose={closeNavMenu}
              sx={{ p: 0 }}
            >
              {homepageLinks.map((link) => (
                <MenuItem
                  component="button"
                  key={link.page}
                  onClick={() => {
                    setNavMenu(null);
                    navigate(link.url);
                  }}
                  sx={{ width: "100%" }}
                >
                  {link.page}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        disableGutters
        sx={{
          minHeight: "auto",
          p: 0,
          // border: "2px solid gold",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ ...theme.mixins.toolbar }}></Box>
        <Container
          disableGutters
          sx={{
            flexGrow: 1,
            // border: "5px solid green",
            display: "flex",
            m: 0,
          }}
        >
          {children}
        </Container>
      </Container>
    </>
  );
};
export default Layout;
