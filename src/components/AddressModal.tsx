import { UserAddressRequestData, UserAddressResponseData } from '../../Types';
import {
  addUserAddress,
  editUserAddressById,
} from '../features/profile/profileSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useEffect, useState } from 'react';

type AddressModalProp = {
  setShowAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
  editAddressData?: UserAddressResponseData | null;
};

const AddressModal = ({
  setShowAddressModal,
  editAddressData,
}: AddressModalProp) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.profile.userData?._id);
  const [address, setAddress] = useState({
    input: {
      userId,
      name: '',
      street: '',
      city: '',
      zipcode: 0,
      state: '',
      country: '',
      phoneNumber: 0,
    },
  });
  const [isFormValid, setIsFormValid] = useState(false);
 

useEffect(() => {
  if (editAddressData) {
    setAddress({
      input: {
        userId,
        name: editAddressData.name,
        street: editAddressData.street,
        city: editAddressData.city,
        zipcode: editAddressData.zipcode,
        state: editAddressData.state,
        country: editAddressData.country,
        phoneNumber: editAddressData.phoneNumber,
      },
    });
  } else {
    setAddress({
      input: {
        userId,
        name: '',
        street: '',
        city: '',
        zipcode: 0,
        state: '',
        country: '',
        phoneNumber: 0,
      },
    });
  }
}, [editAddressData]);


  const dummyAddress = {
    userId,
    name: 'Ethan Hunt',
    street: '24 Wall Street',
    city: 'New York',
    zipcode: 555333,
    state: 'Dallas',
    country: 'United States of America',
    phoneNumber: 7111166666,
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({
      input: { ...address.input, [name]: value },
    });
    const allFieldsFilled = Object.values(address.input).every(
      value => value !== ''
    );
    setIsFormValid(allFieldsFilled);
  };
  const saveHandler = () => {
    if (editAddressData) {
      
      const arg = { _id: editAddressData._id, ...address.input };
      dispatch(editUserAddressById(arg));
    } else {
      
        
        const newAddress: UserAddressRequestData = {
          userId: userId || '',
          name: address.input.name,
          street: address.input.street,
          city: address.input.city,
          zipcode: address.input.zipcode,
          state: address.input.state,
          country: address.input.country,
          phoneNumber: address.input.phoneNumber,
        };
       
        dispatch(addUserAddress(newAddress));
      
    }
    setShowAddressModal(false);
  };
  
  return (
    <>
      <div
        className="fixed z-40 flex justify-center items-center inset-0 bg-slate-800/[0.7]"
        onClick={() => setShowAddressModal((prev: boolean) => !prev)}
      >
        <div
          className="flex flex-col rounded gap-1 shadow-md bg-gray-200 max-h-[90vh] overflow-y-auto p-4  w-3/4 sm:w-2/3 md:1/3 lg:w-1/4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center p-2">
            <p className="text-xl font-bold text-slate-700">
              <i className="bi bi-globe-central-south-asia"></i> Add new address
            </p>
            <button
              className="h-6 w-6 ml-auto rounded-full text-gray-400hover:bg-gray-600"
              onClick={() => setShowAddressModal((prev: boolean) => !prev)}
            >
              <i className="bi bi-x-lg  text-slate-700 hover:text-slate-400"></i>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-semibold text-sm text-slate-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                value={address.input.name || ''}
                required
                onChange={onChangeHandler}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="street"
                className="font-semibold text-sm text-slate-700"
              >
                Street
              </label>
              <input
                type="text"
                name="street"
                value={address.input.street || ''}
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="city"
                className="font-semibold text-sm text-slate-700"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                value={address.input.city || ''}
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="zipcode"
                className="font-semibold text-sm text-slate-700"
              >
                Zipcode
              </label>
              <input
                name="zipcode"
                type="number"
                value={address.input.zipcode || ''}
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-semibold text-sm text-slate-700"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                value={address.input.state || ''}
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-semibold text-sm text-slate-700"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                value={address.input.country || ''}
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="font-semibold text-sm text-slate-700"
              >
                Phone No.
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={address.input.phoneNumber || ''}
                className="text-slate-700 p-2 w-full rounded-lg bg-gray-300 border border-gray-600"
                onChange={onChangeHandler}
                required
              />
            </div>

            <div className="flex justify-around gap-4">
              <button
                type="button"
                className="focus:outline-none font-medium rounded-lg text-sm px-5  py-1 text-slate-800 hover:text-white hover:bg-slate-800"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-slate-800 rounded-lg py-1 px-5 text-gray-200 font-medium hover:bg-slate-600 disabled:bg-slate-600"
                disabled={!isFormValid}
                onClick={() => {
                  if (isFormValid) {
                    saveHandler();
                  }
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                type="button"
                className="border-slate-800 p-1 rounded-md border-[2px] my-1 font-medium  text-slate-800 hover:bg-slate-700 hover:text-gray-100 w-full"
                onClick={() => {
                  dispatch(
                    addUserAddress(dummyAddress as UserAddressRequestData)
                  );
                  setShowAddressModal(false);
                }}
              >
                Add Dummy Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;
