import { RemixImage } from "@/types/remix.type";
import React from "react";

export default function ImageResults({ images }: { images: RemixImage[] }) {
  return (
    <div className="flex gap-2">
      {images.map((image, index) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.uri}
            alt={image.uri}
            className="rounded-sm"
            style={{ width: "300px", height: "300px" }}
            key={image.id}
          />
        );
      })}
    </div>
  );
}
