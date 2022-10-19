import React, { Component } from "react";
import { Box, Button } from "@mui/material";
import Canvas from "./Components/Canvas";
import { CoordinateObj, LineCoordinateObj } from "./Components/types";

class App extends Component {
  state: { history: []; crossPoint: []; isAnimated: boolean; count: Number } = {
    history: [],
    crossPoint: [],
    isAnimated: false,
    count: 0,
  };

  componentDidUpdate() {
    if (this.state.isAnimated) {
      let timer = setTimeout(() => {
        this.setCutLine();
      }, 20);

      if (100 === this.state.count) {
        clearTimeout(timer);
        this.setState({ isAnimated: false, history: [], count: 0 });
      }
    }
  }

  onCollapse = () => {
    this.setState({ crossPoint: [], isAnimated: true });
  };

  setCutLine = (): void => {
    let newHistory: any = [];
    this.setState({ count: +this.state.count + 1 });
    newHistory = this.state.history
      .map((data: LineCoordinateObj) => {
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

    this.setState({ history: newHistory });
  };
  updateState = (sateName: string, value: any) => {
    this.setState({ [sateName]: value });
  };

  render() {
    return (
      <Box p={2}>
        <Canvas {...this.state} updateState={this.updateState} />
        <Box width="fit-content" m="0 auto" mt={5} border="1px solid red">
          <Button onClick={this.onCollapse} disabled={this.state.isAnimated}>
            Collapse lines
          </Button>
        </Box>
      </Box>
    );
  }
}

export default App;
