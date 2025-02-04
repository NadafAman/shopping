import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  console.log(product)
  useEffect(() => {
    const selectedProduct = products.find((p) => p.id === Number(id));
    if (selectedProduct) {
      setProduct(selectedProduct);

      // Related Products by category or mock criteria
      const related = products.filter(
        (item) => item.category === selectedProduct.category && item.id !== selectedProduct.id
      );
      setRelatedProducts(related);
    }
  }, [id, products]);

  if (!product) return <div>Loading product details...</div>;

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-6 gap-6">
      <h1 className="text-3xl font-extrabold">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-96 h-96 object-cover rounded-md"
      />
      <p className="text-xl">{product.description}</p>
      <p className="text-2xl font-semibold text-green-700">${product.price}</p>
      <p>Rating: ⭐ {product.rating}</p>
      <p>Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>

      <h2 className="text-2xl font-bold mt-6">Related Products</h2>
      <div className="flex flex-row gap-4">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((related) => (
            <Link
              key={related.id}
              to={`/products/${related.id}`}
              className="related-product"
            >
              <div className="w-36 h-36 p-2 bg-gray-200 rounded-md text-center">
                <img
                  src={related.thumbnail}
                  alt={related.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <p className="mt-1.5">{related.title}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
