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
    logo: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files.length > 0) {
      // If the field is "logo" and a file has been selected
      // If the field is "logo" and a file has been selected
      console.log("Selected file:", files[0]);
      setFile(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      companyName: formData.companyName,
      companyURL: formData.companyURL,
      careersURL: formData.careersURL,
      aboutCompany: formData.aboutCompany,
      country: formData.country,
      city: formData.city,
      companySize: formData.companySize,
      industry: formData.industry,
      foundedIn: formData.foundedIn,
      logo: file,
    };
    try {
      const res = await fetch("/api/AddCompany/AddCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(companyData), // Send the data as JSON
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
        encType="multipart/form-data"
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
