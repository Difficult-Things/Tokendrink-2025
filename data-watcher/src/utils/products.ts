export const getProductAndQuantity = (
  line: string
): { product: string; quantity: number } => {
  const match = line.match(/^([^\d]+)(\d+)/);

  if (match) {
    const product = match[1].trim().toLowerCase();
    const quantity = parseInt(match[2]);

    return { product, quantity };
  } else {
    console.error("No product found in line: ", line);
    return { product: "", quantity: 0 };
  }
};
