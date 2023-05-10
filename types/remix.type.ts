export interface RemixImage {
  id: string;
  uri: string;
  createdAt: string;
}

export interface RemixResponse {
  createdAt: string;
  id: string;
  prompt: string;
  sourceImageUri: string;
  status: "queued" | "processing" | "finished" | "failed";
  steps: number;
  projectId: string;
  seed: number;
  images: RemixImage[];
}
