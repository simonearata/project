import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";
import Home from "../routes/home";
import Wallet from "../routes/wallet";

function ProjectDash() {
  return (
    <Box>
      <Header />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default ProjectDash;
