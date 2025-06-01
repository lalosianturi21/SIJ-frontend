const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center bg-red-400 text-gray-900 rounded-lg px-4 py-6 max-w-md mx-auto">
      <div className="bg-white rounded-full p-4 mb-4">
        <img src="/images/no-data.png" alt="No data" className="w-20 h-20" />
      </div>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
};

export default ErrorMessage;
