// Import axios for making HTTP requests
import axios from "axios";

/**
 * The expected response structure for the submitImage API call.
 * @typedef {Object} SubmitImageResponse
 * @property {string} remixId - The unique identifier for the submitted image.
 */
interface SubmitImageResponse {
  remixId: string;
}

/**
 * Submits an image file (Blob) to the /api/submit-remix endpoint and returns a unique remixId.
 * Handles and logs errors when submitting the form data.
 * @function submitImage
 * @param {Blob} blob - The image file to be submitted, in the form of a Blob object.
 * @returns {Promise<string | null>} A promise that resolves to the unique remixId for the submitted image, or null in case of an error.
 */
export async function submitImage(
  blob: Blob,
  prompt: string
): Promise<string | null> {
  try {
    // Create a new FormData instance to hold the image Blob
    const formData = new FormData();
    formData.append("image", blob); // Attach the image Blob to the form data
    formData.append("prompt", prompt); // Attach the prompt to the form data

    // Configure and send a POST request to the /api/submit-remix endpoint with the FormData object
    // Set the appropriate 'Content-Type' header for submitting multipart form data
    const response = await axios.post<SubmitImageResponse>(
      "/api/submit-remix",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // If the request is successful, return the unique remixId for the submitted image
    return response.data.remixId;
  } catch (error: unknown) {
    // Log and handle errors that occur during the submission process
    if (error instanceof Error) {
      console.error("Failed to submit form data:", error.message);
    }
    return null; // Return null in case of an error
  }
}
