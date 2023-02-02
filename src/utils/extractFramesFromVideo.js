import ffmpeg from 'fluent-ffmpeg';
import { dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function extractFramesFromVideo(
  inputFilepath,
  outputFilepath,
  frameRate
) {
  await new Promise((resolve, reject) => {
    // Ensure output path exists
    const filePath = dirname(outputFilepath);
    if (!existsSync(filePath)) {
      console.log('Path does not exist');
      mkdirSync(filePath);
    }
    ffmpeg()
      // Specify the filepath to the video
      .input(inputFilepath)

      // Instruct FFmpeg to extract frames at this rate regardless of the video's frame rate
      .fps(frameRate)

      // Save frames to this directory
      .saveToFile(outputFilepath)

      .on('end', () => resolve())
      .on('error', (error) => reject(new Error(error)));
  });
}
