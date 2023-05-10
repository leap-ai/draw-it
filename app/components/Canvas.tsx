"use client";

import React, {
  useRef,
  MouseEvent,
  TouchEvent,
  useEffect,
  useState,
} from "react";
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
  const [isPolling, setIsPolling] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [images, setImages] = useState<RemixImage[]>([
    {
      id: "1",
      uri: "https://static.tryleap.ai/edit-image-gen-426981c6-c909-4880-8e97-31b7fb294fb9/generated_images/1.png",
      createdAt: new Date().toString(),
    },
  ]);

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

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (isTouching) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleScroll, { passive: false });
  }, [isTouching]);

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
  const handleMouseLeave = (_e: MouseEvent) => {
    if (drawing.current) {
      drawing.current = false;
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!canvasRef.current) return;

    setIsTouching(true);
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

  const handleTouchMove = (e: TouchEvent) => {
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

  const handleTouchEnd = (_e: TouchEvent) => {
    if (drawing.current) {
      drawing.current = false;
    }
    setIsTouching(false);
  };

  const getTouchPos = (e: TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    };
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
    console.log("CLICK");
    try {
      const blob = await canvasToBlob();
      let formData = new FormData();
      formData.append("image", blob);

      const response = await axios.post<{ remixId: string }>(
        `/api/submit-remix`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const remixId = response.data.remixId;
      if (!remixId) {
        alert("Something went wrong. Please try again.");
      } else {
        // Start polling for status
        const modelId = "1e7737d7-545e-469f-857f-e4b46eaa151d";
        setIsPolling(true);
        setIsLoading(false);
        pollRemixStatus(modelId, remixId);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error while submitting the form data:", error.message);
      }
      setIsLoading(false);
    }
  };

  // Add these lines inside Canvas component, after the `submitImage` function
  const pollRemixStatus = async (modelId: string, remixId: string) => {
    const pollInterval = 3000;

    const checkStatus = async () => {
      try {
        const response = await axios.get<RemixResponse>(
          `/api/check-remix-status?modelId=${modelId}&remixId=${remixId}`
        );

        const status = response.data.status;
        console.log({ status });

        if (status === "finished" || status === "failed") {
          setImages(response.data.images);
          setIsPolling(false);
        } else if (status === "queued" || status === "processing") {
          setTimeout(checkStatus, pollInterval);
        } else {
          console.error("Unexpected status value");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error while polling for remix status:", error.message);
        }
        setIsPolling(false);
      }
    };

    checkStatus();
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="bg-gray-100 rounded-sm p-2 cursor-crosshair"
      ></canvas>
      <div className="flex gap-2">
        <button
          onClick={submitImage}
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
