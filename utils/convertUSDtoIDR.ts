const exchangeRate = 15000; // Nilai tukar dari USD ke IDR (misalnya, 1 USD = 15,000 IDR)
/**
 *
 * @param usd nominal dalam usd
 * @returns nilai dalam rupiah dengan nilai tukar 1 USD = ${exchangeRate}
 */
export function convertUSDtoIDR(usd: number) {
  const idr = usd * exchangeRate;
  return idr;
}
