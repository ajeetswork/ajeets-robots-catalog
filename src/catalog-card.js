export function buildCatalogCard(product) {
  return {
    title: product.title,
    price: product.price_min,
    classroomCompatibility: product.classroom_compatibility || null
  };
}
