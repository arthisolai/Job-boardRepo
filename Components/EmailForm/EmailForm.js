import React, { useState } from "react";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name: name,
  //     email: email,
  //   };
  //   const response = await fetch("/api/SendEmail/Send", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   if (response.status === 200) {
  //     setName("");
  //     setEmail("");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
    };

    const sendEmailResponse = await fetch("/api/SendEmail/Send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (sendEmailResponse.status === 200) {
      const storeEmailResponse = await fetch("/api/StoreEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (storeEmailResponse.status === 201) {
        setName("");
        setEmail("");
      } else {
        const errorData = await storeEmailResponse.json();
        console.error("Error storing email:", errorData.message);
      }
    } else {
      const errorData = await sendEmailResponse.json();
      console.error("Error sending email:", errorData.message);
    }
  };

  return (
    <div className="user-form bg-white p-8 rounded-md shadow-md max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-semibold text-center">
        Subscribe to our newsletter
      </h1>
      <h2 className="text-xl text-center text-gray-600">
        Stay up to date with our latest jobs!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="input-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="input-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
