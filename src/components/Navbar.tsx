import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { SearchProduct } from '../features/products/productsSlice';

type ActiveLinkProp = {
  isActive: boolean;
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector(state => state.cart.cartData);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);
  const searchValue = useAppSelector(state => state.products.searchValue);
  const activeStyle = ({ isActive }: ActiveLinkProp) => {
    return isActive
      ? 'font-body font-semibold text-sm text-orange-500 hover:text-orange-200'
      : 'font-body font-semibold text-sm hover:text-orange-200';
  };
  return (
    <>
      <header className="flex flex-wrap items-center py-2 px-12 max-[420px]:px-6 sticky top-0 z-10 bg-slate-50">
        <Link to="/" className="flex-1">
          <span className="basis-12 font-logo text-2xl">Easy Buy</span>
        </Link>
        <ul className="flex justify-between order-last flex-[100%] items-center md:order-none md:flex-auto max-md:mt-1">
          <li>
            <NavLink to="/home" className={activeStyle} title="Home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={activeStyle} title="Products">
              Products
            </NavLink>
          </li>
          <li className="relative">
            <NavLink to="/wishlist" className={activeStyle} title="Wishlist">
              Wishlist
            </NavLink>
            {wishlistItems?.length ? (
              <>
                <span className="absolute font-medium text-xs bottom-3 px-1 rounded-full bg-gray-200">
                  {wishlistItems?.length}
                </span>
              </>
            ) : null}
          </li>
          <li>
            <NavLink
              to="/newlaunches"
              className={activeStyle}
              title="New Launches"
            >
              New Launches
            </NavLink>
          </li>
        </ul>
        <span className="flex-1 flex justify-end ">
          <form action="" className="relative w-max mx-2">
            <input
              type="search"
              className="peer cursor-pointer relative z-10 h-12 w-12 bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4 placeholder:italic placeholder:text-slate-400 font-body"
              placeholder="Search for product..."
              title="Search"
              value={searchValue}
              onChange={e => {
                navigate('/products');
                dispatch(SearchProduct(e.target.value));
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-black px-3.5 peer-focus:border-black peer-focus:stroke-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
          <button className="pr-8 relative">
            <NavLink to="/cartlist">
              <i className="bi bi-bag hover:text-red-400" title="Cart"></i>

              {cartItems?.length ? (
                <>
                  <span className="absolute font-medium text-xs top-2 px-1 rounded-full bg-gray-200">
                    {cartItems?.length}
                  </span>
                </>
              ) : null}
            </NavLink>
          </button>
          <button className="pr-8">
            <NavLink to="/profile">
              <i
                className="bi bi-person hover:text-blue-400"
                title="Profile"
              ></i>
            </NavLink>
          </button>
        </span>
      </header>
    </>
  );
};

export default Navbar;
