function imageToCanvas(imgUrl: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = imgUrl;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      resolve(img);
    };
  });
}

export async function imageColor(imgUrl: string) {
  if (!imgUrl) {
    return null;
  }

  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const img = await imageToCanvas(imgUrl);
  const width = img.width;
  const height = img.height;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  const imgData = ctx.getImageData(0, 0, width, height);

  let r = 0;
  let g = 0;
  let b = 0;
  let counter = 0;

  for (let i = 0, length = imgData.data.length; i < length; i += 4) {
    if (imgData.data[i] === imgData.data[i + 1] && imgData.data[i] === imgData.data[i + 2]) {
      continue;
    }

    r += imgData.data[i];
    g += imgData.data[i + 1];
    b += imgData.data[i + 2];

    counter++;
  }

  return {
    r: r / counter,
    g: g / counter,
    b: b / counter
  };
}
