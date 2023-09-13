export default function VerificationSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center items-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Email Verified!
        </h2>
        <p className="text-gray-600 text-center">
          Thank you for verifying your email. You`&apos;`re now ready to receive
          our newsletters and stay updated!
        </p>
      </div>
    </div>
  );
}
