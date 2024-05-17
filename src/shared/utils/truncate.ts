export function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str.trim(); // Remove any leading/trailing spaces
  } else {
    const truncated = str.slice(0, maxLength).trim(); // Truncate and remove trailing spaces
    return truncated + (truncated.length < str.trim().length ? '...' : ''); // Add ellipsis if needed
  }
}
