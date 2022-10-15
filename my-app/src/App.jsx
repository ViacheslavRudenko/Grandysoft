import "./App.css";
import { Box, Button } from "@mui/material";
import { Scene } from "three";
import Canvas from "./Components/Canvas";
import { useRef } from "react";

const scene = new Scene();

function App() {
  const canvas = useRef();
  const onCollapse = () => {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };
  return (
    <Box p={2}>
      <Canvas canvas={canvas} />
      <Box width="fit-content" m="0 auto" mt={5} border="1px solid red">
        <Button onClick={onCollapse}>Collapse lines</Button>
      </Box>
    </Box>
  );
}

export default App;
