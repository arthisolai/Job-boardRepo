import React, { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
    };

    const response = await fetch("/api/StoreEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      setName("");
      setEmail("");
      setIsSuccess(true);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="relative">
      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Success!</strong> Email successfully
          sent.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Image
          src="/images/email.png"
          alt="email bg"
          width={800}
          height={400}
          className="rounded-t-lg"
        />
        <div className="absolute inset-x-0 bottom-16 flex items-center justify-center">
          <div className="bg-opacity-80 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="input-group flex-1">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-2 border rounded-md w-full bg-transparent"
                  placeholder="Enter your email..."
                />
              </div>
              <button
                type="submit"
                className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Signup for Free
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
