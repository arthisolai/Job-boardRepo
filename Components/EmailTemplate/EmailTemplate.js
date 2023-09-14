import React from "react";

export default function EmailTemplate({
  firstName,
  verificationLink,
  unsubscribeLink,
}) {
  return (
    <div>
      <h1>Welcome, {firstName}</h1>
      <p>Please click the link below to verify your email:</p>
      <a href={verificationLink}>Verify Email</a>
      <p>
        If you wish to stop receiving these emails,
        <a href={unsubscribeLink}>click here to unsubscribe</a>.
      </p>
    </div>
  );
}
