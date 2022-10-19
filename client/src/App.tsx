import React from "react";
import { Box, Button } from "@mui/material";
import Canvas from "./Components/Canvas";
import { useEffect, useRef, useState } from "react";
import { CoordinateObj, LineCoordinateObj } from "./Components/types";
import { count } from "console";

function App() {
  const [history, setHistory] = useState([]);
  const [crossPoint, setCrossPoint] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [count, setCount] = useState(0);

  const canvas = useRef();

  useEffect(() => {
    if (isAnimated) {
      let timer = setTimeout(() => {
        setCutLine();
      }, 20);

      if (100 === count) {
        clearTimeout(timer);
        setIsAnimated(false);
        setHistory([]);
        setCount(0);
      }
    }
  }, [isAnimated, history]);

  const onCollapse = () => {
    setCrossPoint([]);
    setIsAnimated(true);
  };

  const setCutLine = (): void => {
    let newHistory: any = [];
    setCount(count + 1);
    newHistory = history
      .map((data: LineCoordinateObj, index) => {
        const vector: CoordinateObj = {
          x: data.end.x - data.start.x,
          y: data.end.y - data.start.y,
        };
        return {
          start: {
            x: data.start.x + vector.x / 50,
            y: data.start.y + vector.y / 50,
          },
          end: {
            x: data.end.x - vector.x / 50,
            y: data.end.y - vector.y / 50,
          },
        };
      })
      .filter((e) => e);

    setHistory(newHistory);
  };

  return (
    <Box p={2}>
      <Canvas
        canvas={canvas}
        history={history}
        setHistory={setHistory}
        crossPoint={crossPoint}
        setCrossPoint={setCrossPoint}
        isAnimated={isAnimated}
      />
      <Box width="fit-content" m="0 auto" mt={5} border="1px solid red">
        <Button onClick={onCollapse} disabled={isAnimated}>
          Collapse lines
        </Button>
      </Box>
    </Box>
  );
}

export default App;
