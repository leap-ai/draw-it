import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ChevronDown } from "@carbon/icons-react";

export const prompts = {
  "Animal: Portrait": "8k portrait of an animal",
  "Animal: Wildlife":
    "wildlife scene featuring animals in their natural habitat",
  "Architecture: Modern": "rendering of modern architecture",
  "Architecture: Historical": "illustration of ancient architectural marvels",
  "Art Styles: Cubism": "cubist interpretation of a cityscape",
  "Art Styles: Surrealism": "surreal dreamscape with fantastical elements",
  "Art Styles: Street Art": "colorful street art inspired by urban culture",
  "Nature: Landscape": "panorama of a mountain landscape",
  "Nature: Waterscape": "serene waterscape with boats and reflections",
  "Technology: Futuristic": "illustration of futuristic transportation",
  "Technology: Vintage": "depiction of early 20th century inventions",
  // Add more prompts here
};

export default function PromptSelector({
  selectedPrompt,
  setSelectedPrompt,
}: {
  selectedPrompt: { key: string; value: string };
  setSelectedPrompt: (prompt: { key: string; value: string }) => void;
}) {
  const getRandomPrompt = () => {
    const promptsEntries = Object.entries(prompts);
    return promptsEntries[Math.floor(Math.random() * promptsEntries.length)];
  };

  useEffect(() => {
    const randomPrompt = getRandomPrompt();
    setSelectedPrompt({
      key: randomPrompt[0],
      value: randomPrompt[1],
    });
  }, [setSelectedPrompt]);

  return (
    <Menu>
      <MenuButton
        as={Button}
        colorScheme="blue"
        rightIcon={<ChevronDown />}
        variant={"outline"}
      >
        {selectedPrompt.key || "Select Style"}
      </MenuButton>
      <MenuList>
        {Object.entries(prompts).map(([key, value]) => (
          <MenuItem key={key} onClick={() => setSelectedPrompt({ key, value })}>
            {key}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
