import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get('reference');
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-semibold">Payment Succesful</h1>
      <h3 className="text-gray-600">Your Reference No. {referenceNum}</h3>
    </div>
  );
};

export default PaymentSuccess;
