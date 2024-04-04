import React, { FC, useEffect } from "react";
import { fabric } from "fabric";
import "./style.css";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Image } from "fabric/fabric-impl";

interface CanvasProps {
  image: Image[];
}

const Canvas: FC<CanvasProps> = ({ image }) => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  // useEffect(() => {
  //   fabric.Image.fromURL(image, function (oImg: Image) {
  //     editor?.canvas.add(oImg);
  //   });
  // }, [fabric, editor]);

  return (
    <div>
      <h1>Canvas</h1>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
};
export default Canvas;
