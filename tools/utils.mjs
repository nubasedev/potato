import fs from 'fs';
export function copyScssFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    throw new Error('Source directory does not exist');
  }
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const sourcePath = sourceDir + '/' + file;
    const stats = fs.statSync(sourcePath);
    if (stats.isFile() && file.endsWith('.scss')) {
      const targetPath = targetDir + '/' + file;
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${sourcePath} to ${targetPath}`);
    }
    if (stats.isDirectory()) {
      const subTargetDir = targetDir + '/' + file;
      copyScssFiles(sourcePath, subTargetDir);
    }
  }
}

