import { useEffect, useState } from "react";

const Canvas = ({ canvas, history, setHistory, crossPoint, setCrossPoint }) => {
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
    onMouveCrossPoint(ctx);
    crossPoint.map((data) => {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(data.x - 5, data.y - 5, 10, 10);
      ctx.stroke();
    });
  }, [canvas, start, end, history, crossPoint]);

  useEffect(() => {
    console.log(crossPoint);
  }, [crossPoint]);

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
    addCrossPoint();
  }

  const intersection = (p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) => {
    var d1x = p1x - p0x,
      d1y = p1y - p0y,
      d2x = p3x - p2x,
      d2y = p3y - p2y,
      d = d1x * d2y - d2x * d1y,
      px,
      py,
      s,
      t;

    if (d) {
      px = p0x - p2x;
      py = p0y - p2y;

      s = (d1x * py - d1y * px) / d;
      if (s >= 0 && s <= 1) {
        t = (d2x * py - d2y * px) / d;
        if (t >= 0 && t <= 1) {
          return { x: p0x + t * d1x, y: p0y + t * d1y };
        }
      }
    }
    return null;
  };

  const onMouveCrossPoint = (ctx) => {
    history.map((data) => {
      const crossPointResult = intersection(
        data.start.x,
        data.start.y,
        data.end.x,
        data.end.y,
        start.x,
        start.y,
        end.x,
        end.y
      );

      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(crossPointResult?.x - 5, crossPointResult?.y - 5, 10, 10);
      ctx.stroke();
    });
  };

  const addCrossPoint = () => {
    history.map((data) => {
      let crossPointResult = intersection(
        data.start.x,
        data.start.y,
        data.end.x,
        data.end.y,
        start.x,
        start.y,
        end.x,
        end.y
      );

      crossPointResult && setCrossPoint([...crossPoint, crossPointResult]);
    });
  };

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
