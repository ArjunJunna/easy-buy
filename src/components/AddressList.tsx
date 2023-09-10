import { useState, useEffect } from 'react';
import AddressModal from './AddressModal';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getUserAddresses,
  deleteUserAddressById,
} from '../features/profile/profileSlice';
import { UserAddressRequestData, UserAddressResponseData } from '../../Types';
import { AddSelectedAddress } from '../features/profile/profileSlice';

const AddressList = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedEditAddress, setSelectedEditAddress] = useState<UserAddressResponseData|null>(null);
  const userId = useAppSelector(state => state.profile.userData?._id);
  const userAddressData = useAppSelector(state => state.profile.userAddress);
  const dispatch = useAppDispatch();
  const length = userAddressData?.length ?? 0;

  useEffect(() => {
    if (userId && length === 0) {
      dispatch(getUserAddresses(userId));
    }
  }, [dispatch, length]);

  const deleteAddressHandler = async (_id: string) => {
    await dispatch(deleteUserAddressById(_id));
  };

  const addressHandler = (data: UserAddressRequestData) => {
    dispatch(AddSelectedAddress(data));
  };

  const editAddressHandler = (data: UserAddressResponseData) => {
    setSelectedEditAddress(data);
    setShowAddressModal(true);
  };

  return (
    <>
      <h5 className="mt-2 font-semibold">Select Address</h5>

      {userAddressData.length === 0 && (
        <>
          <div className="flex gap-2 p-2 justify-center items-center h-28 w-[80%] border-[1px] border-gray-400 rounded-md  ">
            <i
              className="bi bi-plus-square-dotted text-3xl hover:shadow-2xl cursor-pointer"
              onClick={() => setShowAddressModal(true)}
            ></i>
          </div>
        </>
      )}
      {userAddressData.map(data => {
        const {
          name,
          street,
          city,
          state,
          country,
          phoneNumber,
          zipcode,
          _id,
        } = data;
        return (
          <div className="flex gap-2 p-2 items-start w-[80%] border-[1px] border-gray-400 rounded-md hover:shadow-xl hover:bg-slate-100 relative" key={data._id}>
            <input
              type="radio"
              name="address"
              onChange={() => addressHandler(data)}
              id=""
              className="mt-1 accent-gray-700 cursor-pointer"
            />
            <div className="flex-col text-sm" key={_id}>
              <p className="font-semibold">{name}</p>
              <p>{street}</p>
              <p>
                {city} - {zipcode}
              </p>
              <p>
                {state}, {country}
              </p>
              <p>{phoneNumber}</p>
            </div>
            <div className="absolute flex gap-x-2 text-sm text-gray-400 top-1 right-1">
              <i
                className="bi bi-pen-fill cursor-pointer hover:text-slate-900"
                onClick={() => editAddressHandler(data)}
              ></i>
              <i
                className="bi bi-trash3-fill cursor-pointer hover:text-slate-900"
                onClick={() => {
                  deleteAddressHandler(_id);
                }}
              ></i>
            </div>
          </div>
        );
      })}

      <button
        className="border-slate-800 p-1 rounded-md border-[2px] my-2 font-medium  text-slate-800 hover:bg-slate-700 hover:text-gray-100"
        onClick={() => {
          setShowAddressModal(true);
          setSelectedEditAddress(null);
         
        }}
      >
        + Add New Address
      </button>

      {showAddressModal && (
        <AddressModal
          setShowAddressModal={setShowAddressModal}
          editAddressData={selectedEditAddress || null}
        />
      )}
    </>
  );
};

export default AddressList;
