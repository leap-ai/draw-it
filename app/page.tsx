"use client";

import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Canvas from "./components/Canvas";

export default function Home() {
  const apiUrl = "/api/remix";

  return (
    <VStack minW="full" minH="100vh" align="center" py={16} gap={4} px={4}>
      <Heading size={"lg"}>Draw It</Heading>
      <Text>
        Draw something and our AI will generate an image based on your sketch.
      </Text>
      <Canvas width={500} height={500} apiUrl={apiUrl} />
    </VStack>
  );
}
