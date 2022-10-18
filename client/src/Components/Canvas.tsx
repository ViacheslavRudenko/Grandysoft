import { useEffect, useState, MouseEvent } from "react";
import { intersection } from "./functions";
import { CoordinateObj, LineCoordinateObj } from "./types";
import React from "react";

const Canvas = (props: {
  canvas: any;
  history: LineCoordinateObj[];
  setHistory: any;
  crossPoint: CoordinateObj[];
  setCrossPoint: any;
  isAnimated: boolean;
}) => {
  const { canvas, history, setHistory, crossPoint, setCrossPoint, isAnimated } =
    props;
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

    history.map((data: LineCoordinateObj) => {
      ctx.beginPath();
      ctx.moveTo(data?.start.x, data?.start.y);
      ctx.lineTo(data?.end.x, data?.end.y);
      ctx.closePath();
      ctx.stroke();
    });

    !isAnimated && onMouveCrossPoint(ctx);
    !isAnimated &&
      crossPoint.map((data: CoordinateObj) => {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(data.x - 5, data.y - 5, 10, 10);
        ctx.stroke();
      });
  }, [canvas, start, end, history]);

  const setCordinatesData = (
    e: MouseEvent<HTMLButtonElement>
  ): CoordinateObj => {
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const mousedown = (e: any): void => {
    setIsDrawing(true);
    setStart(setCordinatesData(e));
    setEnd(setCordinatesData(e));
  };

  const mousemove = (e: any): void => {
    if (!isDrawing) return;
    setEnd(setCordinatesData(e));
  };

  const mouseup = (): void => {
    setIsDrawing(false);
    setHistory([...history, { start, end }]);
    addCrossPoint();
  };

  const getDataCrossPoint = (): any => {
    let crossPointResult = history.map((data) =>
      intersection(
        data.start.x,
        data.start.y,
        data.end.x,
        data.end.y,
        start.x,
        start.y,
        end.x,
        end.y
      )
    );

    crossPointResult = crossPointResult.filter((el) => el);
    return crossPointResult;
  };

  const onMouveCrossPoint = (ctx: CanvasRenderingContext2D): void => {
    const crossPointData = getDataCrossPoint();
    crossPointData.map((data: any) => {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(data.x - 5, data.y - 5, 10, 10);
      ctx.stroke();
    });
  };

  const addCrossPoint = () => {
    setCrossPoint([...crossPoint, ...getDataCrossPoint()]);
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
