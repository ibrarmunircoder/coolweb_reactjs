export const imageUrlToBlob = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return blob;
};

export function convertImageToBase64(file: File | Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
