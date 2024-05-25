export function getImageMediaType(imageUrl: string) {
  return fetch(imageUrl, { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const contentType = response.headers.get('Content-Type');
      if (contentType!.startsWith('image/')) {
        return contentType;
      } else {
        throw new Error('Invalid image URL');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      return null;
    });
}
