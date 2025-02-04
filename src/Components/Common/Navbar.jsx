import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.totalItems);
  return (
    <div className="w-full h-14 flex flex-row items-center px-6 bg-violet-800 text-neutral-50 fixed top-0 justify-between">
      <span
        className="font-extrabold text-2xl leading-6 cursor-pointer"
        onClick={() => navigate('/')}
      >
        Shopping cart
      </span>
      <div
        className="cursor-pointer text-violet-950 font-extrabold text-xl w-28 h-10 flex justify-center items-center border-2 bg-blue-200 border-blue-950 rounded-lg shadow-2xl"
        onClick={() => navigate('/cart')}
      >
        {`Cart ${cartItems}`}
      </div>
    </div>
  );
};

export default Navbar;
