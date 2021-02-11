import React, { useState } from "react";
import Card from "@material-ui/core/Card";

export default function HoverableCard(props) {
  const [_elevation, setElevation] = useState(0);
  const elevation = props.elevation ? props.elevation : 20;

  return (
    <Card
      {...props}
      elevation={_elevation}
      onMouseOver={() => setElevation(elevation)}
      onMouseOut={() => setElevation(0)}
    >
      {props.children}
    </Card>
  );
}
