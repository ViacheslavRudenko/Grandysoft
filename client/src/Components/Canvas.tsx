import { MouseEvent } from "react";
import { intersection } from "./functions";
import { CoordinateObj, LineCoordinateObj } from "./types";
import React, { Component } from "react";

interface MyProps {
  history: [];
  crossPoint: [];
  isAnimated: boolean;
  count: Number;
  updateState: any;
}

interface MyState {
  isDrawing: boolean;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

class Canvas extends Component<MyProps, MyState> {
  private canvas: any;
  constructor(props: any) {
    super(props);
    this.canvas = React.createRef();
  }

  state = {
    isDrawing: false,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  };

  componentDidUpdate() {
    if (!this.canvas.current) return;
    const ctx = this.canvas.current.getContext("2d");

    if (this.state.isDrawing) {
      ctx.clearRect(
        0,
        0,
        this.canvas.current.width,
        this.canvas.current.height
      );
      ctx.beginPath();
      ctx.moveTo(this.state.start.x, this.state.start.y);
      ctx.lineTo(this.state.end.x, this.state.end.y);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.clearRect(
        0,
        0,
        this.canvas.current.width,
        this.canvas.current.height
      );
    }

    this.props.history.map((data: LineCoordinateObj) => {
      ctx.beginPath();
      ctx.moveTo(data?.start.x, data?.start.y);
      ctx.lineTo(data?.end.x, data?.end.y);
      ctx.closePath();
      ctx.stroke();
    });

    !this.props.isAnimated && this.onMouveCrossPoint(ctx);
    !this.props.isAnimated &&
      this.props.crossPoint.map((data: CoordinateObj) => {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(data.x - 5, data.y - 5, 10, 10);
        ctx.stroke();
      });
  }

  setCordinatesData = (e: MouseEvent<HTMLButtonElement>): CoordinateObj => {
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  mousedown = (e: any): void => {
    this.setState({
      isDrawing: true,
      start: this.setCordinatesData(e),
      end: this.setCordinatesData(e),
    });
  };

  mousemove = (e: any): void => {
    if (!this.state.isDrawing) return;
    this.setState({
      end: this.setCordinatesData(e),
    });
  };

  mouseup = (): void => {
    this.setState({
      isDrawing: false,
    });

    this.props.updateState("history", [
      ...this.props.history,
      { start: this.state.start, end: this.state.end },
    ]);

    this.addCrossPoint();
  };

  getDataCrossPoint = (): any => {
    let crossPointResult = this.props.history.map((data: LineCoordinateObj) =>
      intersection(
        data.start.x,
        data.start.y,
        data.end.x,
        data.end.y,
        this.state.start.x,
        this.state.start.y,
        this.state.end.x,
        this.state.end.y
      )
    );

    crossPointResult = crossPointResult.filter((el) => el);
    return crossPointResult;
  };

  onMouveCrossPoint = (ctx: CanvasRenderingContext2D): void => {
    const crossPointData = this.getDataCrossPoint();
    crossPointData.map((data: any) => {
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.fillRect(data.x - 5, data.y - 5, 10, 10);
      ctx.stroke();
    });
  };

  addCrossPoint = () => {
    this.props.updateState("crossPoint", [
      ...this.props.crossPoint,
      ...this.getDataCrossPoint(),
    ]);
  };

  render() {
    return (
      <canvas
        id="canvas"
        ref={this.canvas}
        onMouseDown={this.mousedown}
        onMouseMove={this.mousemove}
        onMouseUp={this.mouseup}
        width="700"
        height="400"
        style={{ border: "1px solid red", margin: "0 auto", display: "block" }}
      ></canvas>
    );
  }
}
export default Canvas;
