import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks';

type ActiveLinkProp = {
  isActive: boolean;
};

const Navbar = () => {
  const cartItems = useAppSelector(state => state.cart.cartData);
  const wishlistItems = useAppSelector(state => state.products.wishlistData);
  const activeStyle = ({ isActive }: ActiveLinkProp) => {
    return isActive
      ? 'font-body font-semibold text-sm text-orange-500 hover:text-orange-200'
      : 'font-body font-semibold text-sm hover:text-orange-200';
  };
  return (
    <>
      <header className="flex flex-wrap items-center py-3 px-12 max-[420px]:px-6">
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
          <button className="pr-8">
            <i
              className="bi bi-search font-extrabold hover:text-orange-200"
              title="Search"
            ></i>
          </button>
          <button className="pr-8 relative">
            <NavLink to="/cartlist">
              <i className="bi bi-bag hover:text-red-400" title="Cart"></i>

              {cartItems?.length ? (
                <>
                  <span className="absolute font-medium text-xs bottom-3 px-1 rounded-full bg-gray-200">
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
