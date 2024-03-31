import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";
import { ShapeX, ShapeXPoint } from "./shapex";

type DrawStyle = { color?: string; width?: number };

const Canvas = (props: { shape: ShapeX }) => {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );
  const [isDark, setIsDark] = useState(systemPrefersDark);
  const drawLine = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      from: ShapeXPoint,
      to: ShapeXPoint,
      style: DrawStyle = {}
    ) => {
      const { color = "black", width = 1 } = style;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = isDark ? "white" : "black";
      ctx.lineWidth = width;
      ctx.stroke();
      // ctx.strokeText(`${from.x}, ${from.y}`, from.x, from.y);
    },
    [isDark]
  );

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
  }, [drawLine, props.shape]);

  return <canvas ref={canvasRef} {...props} width={288} height={480} />;
};

export default Canvas;
