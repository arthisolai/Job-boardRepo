import React, { useState } from "react";

export default function EmailTemplate({ firstName }) {
  return (
    <div>
      <h1>Welcome, {firstName}</h1>
    </div>
  );
}
