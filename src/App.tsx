import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "./App.css";
import ProjectDash from "./components/root-navigator";
import ItemProvider from "./provider/item-provider";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <ItemProvider>
          <Router>
            <ProjectDash />
          </Router>
        </ItemProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
