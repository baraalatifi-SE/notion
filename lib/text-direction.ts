/**
 * Detects if the given text contains RTL (Right-to-Left) characters
 * Checks for Arabic, Hebrew, Persian, and other RTL scripts
 */
export function isRTL(text: string): boolean {
  if (!text) return false;

  // RTL Unicode ranges:
  // Arabic: \u0600-\u06FF
  // Hebrew: \u0590-\u05FF
  // Arabic Supplement: \u0750-\u077F
  // Arabic Extended-A: \u08A0-\u08FF
  // Arabic Presentation Forms: \uFB50-\uFDFF, \uFE70-\uFEFF
  const rtlRegex =
    /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  return rtlRegex.test(text);
}

/**
 * Returns the text direction ('rtl' or 'ltr') based on the text content
 */
export function getTextDirection(text: string): "rtl" | "ltr" {
  return isRTL(text) ? "rtl" : "ltr";
}

/**
 * Returns the text alignment based on the text direction
 */
export function getTextAlign(text: string): "right" | "left" {
  return isRTL(text) ? "right" : "left";
}
