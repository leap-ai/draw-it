import { RemixImage } from "@/types/remix.type";
import React from "react";

export default function ImageResults({ images }: { images: RemixImage[] }) {
  return (
    <div className="flex gap-2 flex-wrap max-w-4xl justify-center items-center">
      {images.map((image, index) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.uri}
            alt={image.uri}
            className="rounded-md"
            style={{ width: "300px", height: "300px" }}
            key={image.id}
          />
        );
      })}
    </div>
  );
}
