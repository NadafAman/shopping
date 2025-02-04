import { Button } from 'antd';
import './ProductStyles.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/Slice/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, price, image, id }) => {
  const dispatch = useDispatch();
  return (
    <Link to={`/products/${id}`} className="product-card-link">

    <div className="w-52 h-60 border-2 rounded-md shadow-2xl flex flex-col justify-end items-center p-4 gap-2">
      <img width="100px" height="100px" src={image} alt="product image" />
      <span title={title} className="title--text">
        {title}
      </span>
      <span>${price}</span>
      <Button
        type="primary"
        onClick={() => dispatch(addToCart({ title, price, image, id }))}
      >
        Add to cart
      </Button>
    </div>
    </Link>

  );
};

export default ProductCard;
