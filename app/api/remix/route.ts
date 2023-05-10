import { NextResponse } from "next/server";

export const runtime = "edge";

async function createFormData(image: File) {
  const formData = new FormData();
  formData.append("files", image);
  formData.append("prompt", "An 8k photo of an animal");
  formData.append("mode", "scribble");
  formData.append("numberOfImages", "2");

  return formData;
}

async function pollRemixStatus(modelId: string, remixId: string): Promise<any> {
  const apiUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/remix/${remixId}`;
  const pollInterval = 3000;

  return new Promise(async (resolve, reject) => {
    const checkStatus = async () => {
      console.log("CHECKING STATUS");
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${process.env.LEAP_API_KEY}`,
          },
        });

        if (!response.ok) {
          reject(`Polling request failed with status ${response.status}`);
          return;
        }

        const jsonResponse = await response.json();
        const status = jsonResponse.status;

        if (status === "finished" || status === "failed") {
          resolve(jsonResponse);
        } else if (status === "queued" || status === "processing") {
          setTimeout(checkStatus, pollInterval);
        } else {
          reject("Unexpected status value");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          reject(error.message);
        }
      }
    };

    checkStatus();
  });
}

async function postImageToApi(formData: FormData) {
  const modelId = "1e7737d7-545e-469f-857f-e4b46eaa151d";
  const apiUrl = `https://api.tryleap.ai/api/v1/images/models/${modelId}/remix`;

  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${process.env.LEAP_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const jsonResponse = await response.json();
  const remixId = jsonResponse.id;

  if (!remixId) {
    throw new Error("Remix ID not found in API response");
  }

  return pollRemixStatus(modelId, remixId);
}

export async function POST(request: Request) {
  // Get the incoming image from form data
  const incomingFormData = await request.formData();
  const image = incomingFormData.get("image") as File | null;

  if (!image) {
    return NextResponse.json(
      { error: "No image found in request" },
      { status: 400 }
    );
  }

  let jsonResponse;
  try {
    const formData = await createFormData(image);
    jsonResponse = await postImageToApi(formData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error while making request to external API:",
        error.message
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json(jsonResponse);
}
