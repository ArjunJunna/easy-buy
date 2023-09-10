import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer className="flex max-md:flex-wrap bg-slate-100 p-3 max-sm:gap-y-6 max-sm:justify-center">
        <div className="flex flex-col gap-3 basis-1/3 max-sm:basis-2/3">
          <span className="font-logo text-2xl px-4 max-sm:text-center">
            Easy Buy
          </span>
          <p className="text-xs px-4 max-sm:text-center">
            The ecommerce store offers a diverse range of products across
            various categories. It provides secure checkout options and reliable
            shipping services. Customers can enjoy a seamless shopping
            experience with personalized recommendations and customer support.
          </p>

          <div className="flex px-4 gap-x-6 max-sm:justify-center">
            <a
              href="https://twitter.com/Arjun_R_A"
              className="text-gray-900 hover:text-gray-500"
              target="_blank"
            >
              <i
                className="bi bi-twitter"
                aria-hidden="true"
                title="Twitter"
              ></i>
            </a>
            <a
              href="https://www.linkedin.com/in/arjun-r-a-3362aa147/"
              className="text-gray-900 hover:text-gray-500"
              target="_blank"
            >
              <i
                className="bi bi-linkedin"
                aria-hidden="true"
                title="LinkedIn"
              ></i>
            </a>
            <a
              href="https://github.com/ArjunJunna"
              className="text-gray-900 hover:text-gray-500"
              target="_blank"
            >
              <i className="bi bi-github" aria-hidden="true" title="Github"></i>
            </a>
            <a
              href="mailto:arjun9852@gmail.com"
              className="text-gray-900 hover:text-gray-500"
              target="_blank"
            >
              <i
                className="bi bi-envelope-fill"
                aria-hidden="true"
                title="Mail"
              ></i>
            </a>
          </div>
        </div>
        <div className="flex flex-col px-4 basis-1/3 max-sm:basis-2/3">
          <span className="text-lg pb-2 max-sm:text-center font-medium">
            Useful Links
          </span>
          <ul className="flex flex-col text-sm gap-1 max-sm:text-center">
            <li
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={() => navigate('/home')}
            >
              Home
            </li>
            <li
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={() => navigate('/wishlist')}
            >
              Wishlit
            </li>
            <li
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={() => navigate('/cartlist')}
            >
              Cartlist
            </li>
            <li
              className="hover:cursor-pointer hover:text-gray-500"
              onClick={() => navigate('/profile')}
            >
              My Account
            </li>
          </ul>
        </div>
        <div className="flex flex-col px-4 basis-1/3 max-sm:basis-2/3">
          <span className="text-lg pb-2 max-sm:text-center font-medium">
            Contact
          </span>
          <ul className="flex flex-col text-sm gap-2 max-sm:text-center">
            <li>
              <i className="bi bi-geo-alt-fill pr-2"></i>
              530 South Carolina 98336
            </li>
            <li>
              <i className="bi bi-telephone-fill pr-2"></i>
              +999910000
            </li>
            <li>
              <i className="bi bi-envelope-fill pr-2"></i>
              easybuy@gmail.com
            </li>
            <li className="flex max-sm:justify-center">
              <img
                src="https://i.ibb.co/Qfvn4z6/payment.png"
                alt="Payment options"
                className="py-2"
              />
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
