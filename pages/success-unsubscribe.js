import Link from "next/link";

export default function Unsubscribed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Unsubscribed</h1>
        <p className="mb-4">
          You have been successfully unsubscribed from our mailing list.
        </p>
        <p>
          If this was a mistake or you would like to rejoin in the future,
          please feel free to subscribe again!
        </p>
        <div className="mt-6">
          <Link href="/">
            <span className="text-indigo-600 hover:underline">
              Go back to homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
