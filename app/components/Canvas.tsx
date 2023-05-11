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
import { Box, Button, Flex, Stack, VStack } from "@chakra-ui/react";
import PromptSelector, { prompts } from "./PromptSelector";

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

  const [selectedPrompt, setSelectedPrompt] = useState({
    key: "",
    value: "",
  });

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
      const remixId = await submitImage(blob, selectedPrompt.value);
      if (!remixId) {
        alert("Something went wrong. Please try again.");
      } else {
        // Start polling for status
        const modelId = "1e7737d7-545e-469f-857f-e4b46eaa151d";
        setIsPolling(true);
        setIsLoading(false);
        pollRemixStatus(modelId, remixId, setImages, setIsPolling);
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
      <VStack spacing={2} w="full" maxW="lg">
        <ImageResults images={images} />
        <Button onClick={clearCanvas} colorScheme="blue" w={"full"}>
          Try Again
        </Button>
      </VStack>
    );
  }

  return (
    <Stack mx={"auto"}>
      <Box bg={"gray.100"} rounded={"md"} p={2}>
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
          style={{
            touchAction: "none",
            maxWidth: "100%",
            cursor: "url('pen-fountain.svg') 4 28, default",
          }}
        ></canvas>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleImageSubmission();
        }}
      >
        <Stack>
          <PromptSelector
            selectedPrompt={selectedPrompt}
            setSelectedPrompt={setSelectedPrompt}
          />
          <Flex gap={2}>
            <Button
              type="submit"
              isLoading={isLoading || isPolling}
              w={"full"}
              colorScheme="blue"
              variant={"solid"}
            >
              Submit
            </Button>
            {!isLoading && !isPolling && (
              <Button onClick={clearCanvas}>Clear</Button>
            )}
          </Flex>
        </Stack>
      </form>
    </Stack>
  );
};

export default Canvas;
