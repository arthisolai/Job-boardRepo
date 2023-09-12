// import React, { useState } from "react";
// import { createGlobalStyle } from "styled-components";
// import styles from "./AddCompanyForm.module.css";
// import Image from "next/image";

// export default function AddCompanyForm() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyURL: "",
//     careersURL: "",
//     aboutCompany: "",
//     country: "",
//     city: "",
//     companySize: "",
//     industry: "",
//     foundedIn: "",
//   });
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [file, setFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // Remove the logo check completely from here
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSubmit = new FormData();
//     for (const name in formData) {
//       formDataToSubmit.append(name, formData[name]);
//     }
//     if (file) {
//       formDataToSubmit.append("logo", file);
//     }
//     for (let pair of formDataToSubmit.entries()) {
//       console.log(pair[0] + ", " + pair[1]);
//     }
//     try {
//       const res = await fetch("/api/AddCompany/AddCompany", {
//         method: "POST",
//         body: formDataToSubmit, // Using FormData here
//       });

//       if (res.status === 201) {
//         const data = await res.json();
//         console.log("Company added:", data);
//         setShowSuccess(true);
//       } else {
//         console.log("Error:", res.status, await res.json());
//       }
//     } catch (error) {
//       console.log("Fetch error:", error);
//     }
//   };

//   return (
//     <div className={styles.modalcontainer}>
//       <h1 className={styles.heading}>Add Company Details</h1>{" "}
//       {/* This is your new heading */}
//       {showSuccess ? (
//         <div className={styles.successMessage}>Company successfully added!</div>
//       ) : null}
//       <form
//         action="/api/AddCompany/AddCompany"
//         method="POST"
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <input
//           type="text"
//           name="companyName"
//           placeholder="Company Name"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="url"
//           name="companyURL"
//           placeholder="Company URL"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="url"
//           name="careersURL"
//           placeholder="Careers URL"
//           onChange={handleChange}
//           required
//         />
//         <textarea
//           name="aboutCompany"
//           placeholder="About Company"
//           onChange={handleChange}
//           required
//         ></textarea>
//         <input
//           type="text"
//           name="country"
//           placeholder="Country"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="companySize"
//           placeholder="Company Size"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="industry"
//           placeholder="Industry"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="foundedIn"
//           placeholder="Founded In"
//           onChange={handleChange}
//           required
//         />
//         {/* <input
//           type="file"
//           name="logo"
//           onChange={(e) => {
//             setFile(e.target.files[0]);
//             console.log(e.target.files[0]);
//           }}
//           required
//         /> */}
//         <Image
//           src={`data:image/jpeg;base64,${yourBase64String}`}
//           alt="Description"
//           width={500} // specify a width
//           height={500} // specify a height
//         />

//         <button type="submit">Add Company</button>
//       </form>
//     </div>
//   );
// }

//----------------------BASE64------------------------------------------------

import React, { useState } from "react";
import styles from "./AddCompanyForm.module.css";
import Image from "next/image";

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
  const [base64Image, setBase64Image] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64Image(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      ...formData,
      companyLogo: base64Image,
    };

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
  };

  return (
    <div className={styles.modalcontainer}>
      <h1 className={styles.heading}>Add Company Details</h1>
      {showSuccess ? (
        <div className={styles.successMessage}>Company successfully added!</div>
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
        <input type="file" name="companyLogo" onChange={handleImageChange} />

        {base64Image && (
          <Image
            src={base64Image}
            alt="Uploaded Image"
            width={50}
            height={50}
          />
        )}

        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}