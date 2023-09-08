import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";

export default function AddCompanyForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyURL: "",
    careersURL: "",
    aboutCompany: "",
    country: "",
    city: "",
    companySize: "",
    industry: "",
    foundedIn: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    console.log(formData);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const logoFormData = new FormData();
    logoFormData.append("logo", file);

    const logoResponse = await fetch("/api/UploadLogo/UploadLogo", {
      method: "POST",
      body: logoFormData,
    });

    const logoData = await logoResponse.json();
    console.log("====================", logoData);

    if (logoResponse.ok) {
      const imageUrl = logoData.imageUrl;

      const companyData = {
        ...formData,
        companyLogo: imageUrl,
      };
      console.log("Company Data:", companyData);

      // if (logoResponse.ok) {
      //   const companyData = {
      //     ...formData,
      //     companyLogo: logoData.imageUrl,
      //   };
      try {
        const res = await fetch("/api/AddCompany/AddCompany", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(companyData),
        });

        if (res.status === 201) {
          const data = await res.json();
          console.log("Company added:", data);
          setShowSuccess(true);
        } else {
          console.log("Error:", res.status, await res.json());
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    }
  };

  return (
    <div>
      {showSuccess ? (
        <div className="success-message">Company successfully added!</div>
      ) : null}

      <form
        action="/api/AddCompany/AddCompany"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="companyURL"
          placeholder="Company URL"
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="careersURL"
          placeholder="Careers URL"
          onChange={handleChange}
          required
        />
        <textarea
          name="aboutCompany"
          placeholder="About Company"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="country"
          placeholder="Country"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companySize"
          placeholder="Company Size"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="foundedIn"
          placeholder="Founded In"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="logo"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}
