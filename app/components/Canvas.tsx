"use client";

import React, { useRef, MouseEvent, useEffect, useState } from "react";
import axios from "axios";
import { RemixImage, RemixResponse } from "@/types/remix.type";
import Spinner from "./ui/Spinner";
import ImageResults from "./ImageResults";

interface CanvasProps {
  width: number;
  height: number;
  apiUrl: string;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<RemixImage[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Fill the canvas with a white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, props.width, props.height);
      }
    }
  }, [props.height, props.width]);

  const getMousePos = (e: MouseEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!drawing.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const mousePos = getMousePos(e, canvas);

    if (ctx) {
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
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

  const handleMouseUp = (_e: MouseEvent) => {
    if (drawing.current) {
      drawing.current = false;
    }
  };

  const canvasToBlob = (): Promise<Blob> => {
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

  const submitImage = async () => {
    setIsLoading(true);
    try {
      const blob = await canvasToBlob();
      let formData = new FormData();
      formData.append("image", blob);
      const response = await axios.post<RemixResponse>(props.apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.images.length === 0) {
        alert("Something went wrong. Please try again.");
      }
      setImages(response.data.images);

      // Handle the API response here
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error while submitting the form data:", error.message);
      }
    }
    setIsLoading(false);
  };

  const clearCanvas = () => {
    setImages([]);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        // ctx.fillStyle = "white";
        ctx.fillRect(0, 0, props.width, props.height);
      }
    }
  };

  if (images.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        <ImageResults images={images} />
        <button
          onClick={clearCanvas}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <canvas
        ref={canvasRef}
        width={props.width}
        height={props.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-gray-100 rounded-sm p-2"
      ></canvas>
      <div className="flex gap-2">
        <button
          onClick={submitImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isLoading ? <Spinner /> : "Submit"}
        </button>
        {!isLoading && (
          <button
            onClick={clearCanvas}
            className="bg-gray-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Canvas;
