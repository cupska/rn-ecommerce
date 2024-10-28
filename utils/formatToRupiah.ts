export function formatToRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0, // Menghilangkan angka desimal jika tidak diperlukan
  }).format(amount);
}
