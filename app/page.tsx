"use client";

import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Canvas from "./components/Canvas";

export default function Home() {
  const apiUrl = "/api/remix";

  return (
    <Container maxW="container.lg">
      <VStack align="center" py={16} gap={4}>
        <Heading size={"lg"}>Draw It</Heading>
        <Text textAlign={"center"}>
          Draw something and our AI will generate an image based on your sketch.
        </Text>
        <Canvas width={500} height={500} apiUrl={apiUrl} />
      </VStack>
    </Container>
  );
}
