import "./App.css";
import { Box, Button } from "@mui/material";
import { Scene } from "three";
import Canvas from "./Components/Canvas";
import { useEffect, useRef, useState } from "react";

function App() {
  const [history, setHistory] = useState([]);
  const [crossPoint, setCrossPoint] = useState([]);
  const canvas = useRef();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    history.length === 0 &&
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    // ctx.clip();
  }, [history]);

  const onCollapse = () => {
    setHistory([]);
    setCrossPoint([]);
  };

  return (
    <Box p={2}>
      <Canvas
        canvas={canvas}
        history={history}
        setHistory={setHistory}
        crossPoint={crossPoint}
        setCrossPoint={setCrossPoint}
      />
      <Box width="fit-content" m="0 auto" mt={5} border="1px solid red">
        <Button onClick={onCollapse}>Collapse lines</Button>
      </Box>
    </Box>
  );
}

export default App;
