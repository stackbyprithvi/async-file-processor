import { spawn } from "child_process";
import { resolve } from "dns";

export async function runFFmpeg(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", ["-i", inputPath, outputPath]);

    // Print FFmpeg logs (very useful while learning)
    ffmpeg.stderr.on("data", (data) => {
      console.log(data.toString());
    });

    // FFmpeg finished
    ffmpeg.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });

    ffmpeg.on("error", (err) => {
      reject(err);
    });
  });
}
