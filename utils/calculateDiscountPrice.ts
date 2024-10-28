export function calculateFinalPrice(
  originalPrice: number,
  discountPercentage: number
) {
  // Pastikan harga dan diskon valid
  if (originalPrice < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error(
      "Harga dan diskon harus valid. Diskon harus antara 0 dan 100."
    );
  }

  // Hitung jumlah diskon
  const discountAmount = (originalPrice * discountPercentage) / 100;

  // Hitung harga final
  const finalPrice = originalPrice - discountAmount;

  return finalPrice;
}
