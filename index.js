const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

// Directorio donde están los archivos .avi
const videosDir = "./video";

// Leer los archivos del directorio
fs.readdir(videosDir, (err, files) => {
  if (err) {
    console.error("Error al leer el directorio", err);
    return;
  }

  // Filtrar para obtener solo archivos .avi
  const aviFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".avi"
  );

  aviFiles.forEach((file) => {
    const filePath = path.join(videosDir, file);
    const outputFilePath = path.join(
      videosDir,
      path.basename(file, path.extname(file)) + ".mp3"
    );

    ffmpeg(filePath)
      .toFormat("mp3")
      .on("error", (err) => {
        console.error(`Error al procesar el archivo ${file}:`, err);
      })
      .on("end", () => {
        console.log(`Archivo convertido exitosamente: ${outputFilePath}`);
      })
      .save(outputFilePath);
  });
});
