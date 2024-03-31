"use client";

import { useEffect, useState } from "react";
import Canvas from "./canvas";
import { ShapeX, ShapeXPoint } from "./shapex";

export default function Home() {
  const [shape, setShape] = useState(new ShapeX());

  useEffect(() => {
    generateShape();
  }, []);

  const handleClick = () => {
    generateShape();
  };

  const generateShape = () => {
    const newShape = new ShapeX();
    newShape.addPoint(new ShapeXPoint(Math.random() * 288, 0, 1));

    for (let i = 1; i < 10; i++) {
      newShape.addPoint(
        new ShapeXPoint(
          144 + Math.random() * 144,
          Math.random() * 48 + i * 48,
          1
        )
      );
    }

    newShape.addPoint(new ShapeXPoint(Math.random() * 288, 480, 1));

    for (let i = 1; i < 10; i++) {
      newShape.addPoint(
        new ShapeXPoint(
          Math.random() * 144,
          Math.random() * 48 + (10 - i) * 48,
          1
        )
      );
    }

    setShape(newShape);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">ShapeX</h1>
      </div>
      <Canvas shape={shape} />
      <div className="flex flex-col items-center justify-center">
        <p className="text-lg text-center">Perimeter: {shape.perimeter()}</p>
      </div>
    </main>
  );
}
