import { MutableRefObject, useEffect, useRef } from "react";
import { ShapeX, ShapeXPoint } from "./shapex";

type DrawStyle = { color?: string; width?: number };

const Canvas = (props: { shape: ShapeX }) => {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      return;
    }

    if (props.shape.head === null) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (
      let current: ShapeXPoint | null = props.shape.head;
      current !== null;
      current = current.next
    ) {
      drawLine(ctx, current, current.next || props.shape.head);
    }
  }, [props.shape]);

  return <canvas ref={canvasRef} {...props} width={288} height={480} />;
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  from: ShapeXPoint,
  to: ShapeXPoint,
  style: DrawStyle = {}
) => {
  const { color = "black", width = 1 } = style;

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  // ctx.strokeText(`${from.x}, ${from.y}`, from.x, from.y);
};

export default Canvas;
