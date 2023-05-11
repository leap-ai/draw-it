"use client";

import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
} from "@/lib/canvasHandlers";
import { canvasToBlob } from "@/lib/canvasUtils";
import { pollRemixStatus } from "@/lib/pollRemixStatus";
import { submitImage } from "@/lib/submitImage";
import { RemixImage } from "@/types/remix.type";
import React, { useEffect, useRef, useState } from "react";
import ImageResults from "./ImageResults";
import Spinner from "./ui/Spinner";

interface CanvasProps {
  width: number;
  height: number;
  apiUrl: string;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
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
  }, [props.height, props.width, images]);

  const handleImageSubmission = async () => {
    setIsLoading(true);
    try {
      const blob = await canvasToBlob(canvasRef);
      const remixId = await submitImage(blob);
      if (!remixId) {
        alert("Something went wrong. Please try again.");
      } else {
        // Start polling for status
        const modelId = "1e7737d7-545e-469f-857f-e4b46eaa151d";
        setIsPolling(true);
        setIsLoading(false);
        pollRemixStatus(modelId, remixId, setImages);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error while submitting the form data:", error.message);
      }
      setIsLoading(false);
    }
  };

  const clearCanvas = () => {
    setImages([]);
  };

  if (images.length > 0) {
    return (
      <div className="flex flex-col gap-2 w-full max-w-lg">
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
        onMouseDown={(e) => handleMouseDown(e, drawing, canvasRef)}
        onMouseMove={(e) => handleMouseMove(e, drawing, canvasRef)}
        onMouseUp={() => handleMouseUp(drawing)}
        onMouseLeave={() => handleMouseLeave(drawing)}
        onTouchStart={(e) => handleTouchStart(e, drawing, canvasRef)}
        onTouchMove={(e) => handleTouchMove(e, drawing, canvasRef)}
        onTouchEnd={() => handleTouchEnd(drawing)}
        className="bg-gray-100 rounded-sm p-2 cursor-crosshair"
      ></canvas>
      <div className="flex gap-2">
        <button
          onClick={handleImageSubmission}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {isLoading || isPolling ? <Spinner /> : "Submit"}
        </button>
        {!isLoading && !isPolling && (
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
