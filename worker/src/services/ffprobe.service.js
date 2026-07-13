import { spawn } from "child_process";

export async function getVideoMetadata(inputPath) {
  return new Promise((resolve, reject) => {
    const ffprobe = spawn("ffprobe", [
      "-v",
      "quiet",
      "-print_format",
      "json",
      "-show_format",
      "-show_streams",
      inputPath,
    ]);

    let output = "";

    // Collect all JSON output
    ffprobe.stdout.on("data", (data) => {
      output += data.toString();
    });

    ffprobe.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error("ffprobe failed"));
      }

      try {
        const metadata = JSON.parse(output);

        // Find the video stream
        const videoStream = metadata.streams.find(
          (stream) => stream.codec_type === "video",
        );

        if (!videoStream) {
          return reject(new Error("No video stream found"));
        }

        // Convert "30/1" or "30000/1001" into a number
        const [numerator, denominator] = videoStream.avg_frame_rate
          .split("/")
          .map(Number);

        const fps = denominator ? numerator / denominator : 0;

        resolve({
          duration: Number(metadata.format.duration),
          width: videoStream.width,
          height: videoStream.height,
          codec: videoStream.codec_name,
          fps,
          bitrate: Number(metadata.format.bit_rate),
        });
      } catch (err) {
        reject(err);
      }
    });

    ffprobe.on("error", (err) => {
      reject(err);
    });
  });
}
