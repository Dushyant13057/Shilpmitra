/**
 * High-fidelity deterministic local artisan image enhancement processor.
 * Runs in-browser without external paid AI credits.
 * Applies studio illumination, balanced contrast, subtle saturation, and micro-texture sharpening.
 */
export async function enhanceImageLocally(source: File | string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          throw new Error("Unable to create 2D canvas context");
        }

        // Maintain original dimensions up to max 1920px for fast, crisp processing
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;
        const maxDim = 1920;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // 1. Studio Illumination & Dynamic Contrast (matches DemoImageEnhancementService)
        // Contrast: +14% (multiplier 1.14), Brightness: +12
        const contrast = 1.14;
        const brightness = 12;

        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];

          // Contrast & Brightness adjustment
          r = (r - 128) * contrast + 128 + brightness;
          g = (g - 128) * contrast + 128 + brightness;
          b = (b - 128) * contrast + 128 + brightness;

          // Subtle color vibrance enrichment (+8% saturation)
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;
          r = luma + (r - luma) * 1.08;
          g = luma + (g - luma) * 1.08;
          b = luma + (b - luma) * 1.08;

          data[i] = Math.min(255, Math.max(0, r));
          data[i + 1] = Math.min(255, Math.max(0, g));
          data[i + 2] = Math.min(255, Math.max(0, b));
        }

        ctx.putImageData(imgData, 0, 0);

        // 2. Unsharp Mask Sharpness Convolution pass (preserves authentic craft weave & edges)
        const sharpened = ctx.getImageData(0, 0, width, height);
        const srcData = imgData.data;
        const dstData = sharpened.data;

        // 3x3 unsharp convolution kernel
        //  0  -0.2   0
        // -0.2 1.8 -0.2
        //  0  -0.2   0
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;

            for (let c = 0; c < 3; c++) {
              const top = ((y - 1) * width + x) * 4 + c;
              const bottom = ((y + 1) * width + x) * 4 + c;
              const left = (y * width + (x - 1)) * 4 + c;
              const right = (y * width + (x + 1)) * 4 + c;

              const val =
                srcData[idx + c] * 1.8 -
                (srcData[top] + srcData[bottom] + srcData[left] + srcData[right]) * 0.2;

              dstData[idx + c] = Math.min(255, Math.max(0, val));
            }
          }
        }

        ctx.putImageData(sharpened, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              resolve(canvas.toDataURL("image/png"));
            }
          },
          "image/png",
          0.95
        );
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load source image for enhancement"));
    };

    if (typeof source === "string") {
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
}
