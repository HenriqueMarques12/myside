export async function generateStaticParams() {
  try {
    const products = await fetch('https://fakestoreapi.com/products').then((res) =>
      res.json()
    );
    return products.map((product: any) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}