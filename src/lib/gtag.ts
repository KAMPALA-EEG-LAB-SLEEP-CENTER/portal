export function trackConversion(
  sendTo: string,
  value?: number,
  currency?: string,
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      ...(value !== undefined && { value }),
      ...(currency && { currency }),
    });
  }
}

export const CONVERSION_LABELS = {
  BOOKING: "AW-18243400850/wCD5CNeQldccEJLpkPtD",
};
