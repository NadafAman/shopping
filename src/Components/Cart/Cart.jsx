import { useSelector , useDispatch} from 'react-redux';
import './CartStyles.scss';
import {removeFromCart} from '../../store//Slice/cartSlice'
import { Trash } from 'lucide-react';

const Cart = () => {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state?.cart?.items);
  const total = cartItems?.reduce(
    (acc, ele) => Math.round(acc + ele.price * ele.quantity),
    0
  );
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="w-full h-full flex flex-col justify-start items-center bg-green-300 p-6 gap-6">
      <h1 className='text-3xl font-extrabold text-green-900'>Items in cart</h1>
      {cartItems?.length > 0 ? (
        <>
          <div className="w-full h-full flex flex-col justify-start items-center bg-green-300 gap-4 border-b-2 pb-10">
            {cartItems?.map((ele) => (
              <div
                key={ele.id}
                className="w-full h-28 px-5 border-2 bg-green-950 text-neutral-50 flex flex-row gap-2 rounded-lg shadow-xl items-center justify-start"
              >
                <img
                  height="95px"
                  width="95px"
                  src={ele?.image}
                  alt="product image"
                />
                <div className="h-auto flex flex-col gap-1 ml-4">
                  <h3 className="cart-title--text" title={ele.title}>
                    {ele.title}
                  </h3>
                  <p>Price: ${ele.price}</p>
                </div>

                <p className="ml-20">X{ele.quantity}</p>
                <span className="ml-auto">${ele.price * ele.quantity}</span>
                <button className="p-2 text-red-500 hover:bg-red-100 rounded-full " 
                  onClick={() => handleRemove(ele.id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="w-full h-28 px-5 border-4 border-red-900 bg-red-200 text-black flex flex-row rounded-lg shadow-2xl items-center justify-between">
            <span className="text-3xl font-extrabold">Total:</span>
            <span className="text-3xl font-extrabold text-red-950">
              {total}
            </span>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-2xl font-extrabold text-green-900">
          Cart is empty!
        </div>
      )}
    </div>
  );
};

export default Cart;
