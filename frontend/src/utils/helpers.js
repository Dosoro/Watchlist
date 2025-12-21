/**
 * Extract username from email
 */
export function getUsername(email) {
  return email?.split("@")[0] || "User";
}

/**
 * Debounce function for search
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Check if value is empty
 */
export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * Capitalize first letter
 */
export function capitalize(str) {
  if (isEmpty(str)) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
