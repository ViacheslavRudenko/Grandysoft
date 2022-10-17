import { useEffect, useState } from "react";

const Canvas = ({ canvas, history, setHistory }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.stroke();

    history.map((data) => {
      ctx.beginPath();
      ctx.moveTo(data.start.x, data.start.y);
      ctx.lineTo(data.end.x, data.end.y);
      ctx.closePath();
      ctx.stroke();
    });
  }, [canvas, start, end, history]);

  const setCordinatesData = (e) => {
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const mousedown = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    setStart(setCordinatesData(e));
    setEnd(setCordinatesData(e));
  };

  function mousemove(e) {
    e.preventDefault();
    if (!isDrawing) return;

    setEnd(setCordinatesData(e));
  }
  function mouseup(e) {
    e.preventDefault();
    setIsDrawing(false);
    setHistory([...history, { start, end }]);
  }

  return (
    <canvas
      id="canvas"
      ref={canvas}
      onMouseDown={mousedown}
      onMouseMove={mousemove}
      onMouseUp={mouseup}
      width="700"
      height="400"
      style={{ border: "1px solid red", margin: "0 auto", display: "block" }}
    ></canvas>
  );
};

export default Canvas;
