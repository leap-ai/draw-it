import axios from "axios";
import { RemixImage, RemixResponse } from "@/types/remix.type";

/**
 * Interface for the properties required to poll the remix status.
 */
interface PollRemixStatusProps {
  modelId: string;
  remixId: string;
  updateStatus: (images: RemixImage[]) => void;
  setIsPolling: (isPolling: boolean) => void;
}

// Polling interval in milliseconds.
const POLL_INTERVAL_MS = 3000;

/**
 * Checks the status of a remix, updating the status with new images,
 * and recursively calls itself until the status is finished or failed.
 *
 * @param {PollRemixStatusProps} props - An object containing the required properties for polling.
 * @param {number} pollInterval - The interval at which the poll should be executed in milliseconds.
 * @returns {Promise<void>}
 */
async function checkStatus(
  { modelId, remixId, updateStatus, setIsPolling }: PollRemixStatusProps,
  pollInterval: number
): Promise<void> {
  try {
    const response = await axios.get<RemixResponse>(
      `/api/check-remix-status?modelId=${modelId}&remixId=${remixId}`
    );

    const status = response.data.status;

    if (status === "finished" || status === "failed") {
      updateStatus(response.data.images);
      setIsPolling(false);
    } else if (status === "queued" || status === "processing") {
      setTimeout(
        () =>
          checkStatus(
            { modelId, remixId, updateStatus, setIsPolling },
            pollInterval
          ),
        pollInterval
      );
    } else {
      console.error("Unexpected status value");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while polling for remix status:", error.message);
    }
  }
}

/**
 * Starts the polling process to check the status of a remix, updating the status with new images.
 *
 * @export
 * @param {string} modelId - The ID of the model being used.
 * @param {string} remixId - The ID of the remix being processed.
 * @param {(images: RemixImage[]) => void} updateStatus - A callback function to update the status with new images.
 * @returns {Promise<void>}
 */
export const pollRemixStatus = (
  modelId: string,
  remixId: string,
  updateStatus: (images: RemixImage[]) => void,
  setIsPolling: (isPolling: boolean) => void
): Promise<void> => {
  return checkStatus(
    { modelId, remixId, updateStatus, setIsPolling },
    POLL_INTERVAL_MS
  );
};
