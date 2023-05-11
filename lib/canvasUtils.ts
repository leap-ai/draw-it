import { MouseEvent, TouchEvent } from "react";
import { RefObject } from "react";

export const getMousePos = (e: MouseEvent, canvas: HTMLCanvasElement) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

export const getTouchPos = (e: TouchEvent, canvas: HTMLCanvasElement) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.touches[0].clientX - rect.left) * scaleX,
    y: (e.touches[0].clientY - rect.top) * scaleY,
  };
};

export const canvasToBlob = (
  canvasRef: RefObject<HTMLCanvasElement>
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas toBlob() failed."));
        }
      }, "image/png");
    } else {
      reject(new Error("Canvas ref is null."));
    }
  });
};
