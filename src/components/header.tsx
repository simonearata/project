import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box h={"70px"} bgColor={"white"} position={"sticky"} zIndex={"100"}>
      <Box>
        <Link to="/">
          <Button variant="button-menu">Home</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Header;
