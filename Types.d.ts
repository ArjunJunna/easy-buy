export type ProductDataForCart = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
  rating: {
    rate: number;
    count: number;
    _id: string;
  };
  discount: number;
  recommended: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  qty: number;
  quantity: number;
};
export type ProductData = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
  rating: {
    rate: number;
    count: number;
    _id: string;
  };
  discount: number;
  recommended: boolean;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  __v: number;
};

export type UserData = {
  _id: string;
  username: string;
  email: string;
};

export type Category =
  | 'Show All Products'
  | 'Electronics'
  | 'Jewelery'
  | `Men's Clothing`
  | `Women's Clothing`;

export type SortPriceType = 'LOW_TO_HIGH' | 'HIGH_TO_LOW' | '';

export type Login = {
  input: {
    username: string;
    password: string;
  };
  error: string;
};

export type SetLogin = React.Dispatch<React.SetStateAction<Login>>;

export type LoginHandlerArg = {
  username:string,
  password:string,
};

export type Signup = {
  input: {
    username: string;
    email: string;
    password: string;
    confirmPwd: string;
  };
  error: string;
  pwdMatch: boolean;
};

export type SetSignup = React.Dispatch<React.SetStateAction<Signup>>;

export type SignupHandlerArg = {
  username: string;
  email:string;
  password: string;
};

export type AddToCartType = {
  userId: string;
  productId: string;
  quantity: number;
};

export type RemoveFromCartType = {
  userId: string;
  productId: string;
};

export type WishlistArgType = {
  userId: string;
  productId: string;
};

export type OrderData = {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: never[];
  offer_id: null;
  receipt: null;
  status: string;
};

export type UserAddressResponseData = {
  _id: string;
  userId: string;
  name: string;
  street: string;
  city: string;
  zipcode: number;
  state: string;
  country: string;
  phoneNumber: number;
  __v: number;
};

export type UserAddressRequestData = {
  _id?:string,
  userId: string;
  name: string;
  street: string;
  city: string;
  zipcode: number;
  state: string;
  country: string;
  phoneNumber: number;
};
