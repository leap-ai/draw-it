import { MouseEvent, TouchEvent } from "react";
import { RefObject } from "react";

import { getMousePos, getTouchPos } from "@/lib/canvasUtils";

interface MutableRefObject<T> {
  current: T;
}

export const handleMouseMove = (
  e: MouseEvent,
  drawing: RefObject<boolean>,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  if (!drawing.current || !canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const mousePos = getMousePos(e, canvas);

  if (ctx) {
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  }
};

export const handleMouseDown = (
  e: MouseEvent,
  drawing: MutableRefObject<boolean>,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  if (!canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const mousePos = getMousePos(e, canvas);

  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    drawing.current = true;
  }
};

export const handleMouseUp = (drawing: MutableRefObject<boolean>) => {
  if (drawing.current) {
    drawing.current = false;
  }
};

export const handleMouseLeave = (drawing: MutableRefObject<boolean>) => {
  if (drawing.current) {
    drawing.current = false;
  }
};

export const handleTouchStart = (
  e: TouchEvent,
  drawing: MutableRefObject<boolean>,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  if (!canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const touchPos = getTouchPos(e, canvas);

  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(touchPos.x, touchPos.y);
    drawing.current = true;
  }

  e.preventDefault();
};

export const handleTouchMove = (
  e: TouchEvent,
  drawing: RefObject<boolean>,
  canvasRef: RefObject<HTMLCanvasElement>
) => {
  if (!drawing.current || !canvasRef.current) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const touchPos = getTouchPos(e, canvas);

  if (ctx) {
    ctx.lineTo(touchPos.x, touchPos.y);
    ctx.stroke();
  }

  e.preventDefault();
};

export const handleTouchEnd = (drawing: MutableRefObject<boolean>) => {
  if (drawing.current) {
    drawing.current = false;
  }
};
