"use client";

import {
  Button,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import Canvas from "./components/Canvas";

export default function Home() {
  const apiUrl = "/api/remix";

  return (
    <>
      <Container maxW="container.lg" mb={16}>
        <VStack align="center" py={8} gap={4}>
          <Heading size={"lg"}>Draw It</Heading>
          <Text textAlign={"center"}>
            Draw something and our AI will generate an image based on your
            sketch.
          </Text>
          <Canvas width={500} height={500} apiUrl={apiUrl} />
        </VStack>
      </Container>
      <VStack
        position={"fixed"}
        bottom={0}
        w={"full"}
        bg={"blackAlpha.200"}
        borderWidth={1}
        borderColor={"blackAlpha.300"}
        backdropFilter={"blur(30px)"}
      >
        <HStack
          p={2}
          roundedTop={"md"}
          gap={2}
          flexDir={{
            base: "column",
            md: "row",
          }}
        >
          <Heading size={"xs"}>{`Built using Leap's Remix API `}</Heading>
          <Button
            leftIcon={<FaGithub />}
            size={"sm"}
            as="a"
            href="https://github.com/leap-api/draw-it"
            target="_blank"
          >
            Fork on GitHub
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
