import { Button } from 'antd';
import './ProductStyles.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/Slice/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, price, image, id, rating }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (event) => {
    event.preventDefault(); // Prevent navigation when clicking the button
    dispatch(addToCart({ title, price, image, id }));
  };

  return (
    <Link to={`/products/${id}`} className="product-card-link">
      <div className="w-52 h-70 border-2 rounded-md shadow-2xl flex flex-col justify-end items-center p-4 gap-2">
        <img width="100px" height="100px" src={image} alt="product image" />
        <span title={title} className="title--text">
          {title}
        </span>
        <span>${price}</span>
        <Button type="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>
        <p>⭐{rating}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
