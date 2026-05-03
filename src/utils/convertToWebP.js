import sharp from 'sharp'
import path from 'path'

export async function convertToWebP(inputPath, outputPath, quality = 80) {
  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath)
}