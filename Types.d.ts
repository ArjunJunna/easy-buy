export type ProductDataForCart = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  qty: number;
};

export type ProductData = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

export type UserData = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
};

export type Category =
  | 'Show All Products'
  | 'electronics'
  | 'jewelery'
  | `men's clothing`
  | `women's clothing`;

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
  login: Login;
  setLogin: SetLogin;
};
