import React from "react";

export default function EmailTemplate({ firstName, verificationLink }) {
  return (
    <div>
      <h1>Welcome, {firstName}</h1>
      <p>Please click the link below to verify your email:</p>
      <a href={verificationLink}>Verify Email</a>
    </div>
  );
}
