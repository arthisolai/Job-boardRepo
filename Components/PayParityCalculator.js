import React, { useState, useEffect } from "react";

export default function PayParityCalculator() {
  const [payParityData, setPayParityData] = useState([]);
  const [sourceCountry, setSourceCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [sourceSalary, setSourceSalary] = useState("");
  const [convertedSalary, setConvertedSalary] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data from /api/parity...");
        const response = await fetch("/api/parity");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data fetched successfully:", data);
        setPayParityData(data);
      } catch (error) {
        console.error("Failed to fetch pay parity data:", error);
      }
    }

    fetchData();
  }, []);

  function calculateConvertedSalary() {
    console.log("calculateConvertedSalary called");

    const sourceParity = payParityData.find(
      (item) => item.CountryCode === sourceCountry
    );
    const targetParity = payParityData.find(
      (item) => item.CountryCode === targetCountry
    );

    console.log("Source Country:", sourceCountry);
    console.log("Target Country:", targetCountry);
    console.log("Source Salary:", sourceSalary);
    console.log("Source Parity Data:", sourceParity);
    console.log("Target Parity Data:", targetParity);

    if (!sourceParity || !targetParity) return;

    // Extract years from the keys and filter out non-numeric keys
    const yearsSource = Object.keys(sourceParity)
      .filter((key) => !isNaN(Number(key)))
      .map(Number);
    const yearsTarget = Object.keys(targetParity)
      .filter((key) => !isNaN(Number(key)))
      .map(Number);

    console.log("Years in Source Data:", yearsSource);
    console.log("Years in Target Data:", yearsTarget);

    // Find the maximum year that exists in both data sets
    const commonYears = yearsSource.filter((year) =>
      yearsTarget.includes(year)
    );
    const latestYear = Math.max(...commonYears);

    console.log("Common Years:", commonYears);
    console.log("Latest Year:", latestYear);

    if (!latestYear) {
      console.error("No common year found in the data");
      return;
    }

    const sourceParityValue = sourceParity[latestYear];
    const targetParityValue = targetParity[latestYear];

    console.log("Source Parity Value for latest year:", sourceParityValue);
    console.log("Target Parity Value for latest year:", targetParityValue);

    if (!sourceParityValue || !targetParityValue) {
      console.error(`Data not available for the year ${latestYear}`);
      return;
    }

    const conversionRate = targetParityValue / sourceParityValue;
    console.log("Conversion Rate:", conversionRate);

    setConvertedSalary(sourceSalary * conversionRate);
    console.log("Converted Salary:", sourceSalary * conversionRate);
  }

  return (
    <div>
      <div>
        <label>Source Country:</label>
        <select
          value={sourceCountry}
          onChange={(event) => setSourceCountry(event.target.value)}
          style={{ color: "black" }}
        >
          {payParityData.map((country) => (
            <option key={country.CountryCode} value={country.CountryCode}>
              {country.CountryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Source Salary:</label>
        <input
          type="number"
          value={sourceSalary}
          onChange={(event) => {
            console.log("Changed value:", event.target.value);
            setSourceSalary(Number(event.target.value));
          }}
          style={{ color: "black" }}
        />
      </div>

      <div>
        <label>Target Country:</label>
        <select
          value={targetCountry}
          onChange={(event) => setTargetCountry(event.target.value)}
          style={{ color: "black" }}
        >
          {payParityData.map((country) => (
            <option key={country.CountryCode} value={country.CountryCode}>
              {country.CountryName}
            </option>
          ))}
        </select>
      </div>

      <button onClick={calculateConvertedSalary}>Convert</button>

      <div>
        <label>Converted Salary in :</label>
        <input
          type="text"
          value={convertedSalary}
          readOnly
          style={{ color: "black" }}
        />
      </div>
    </div>
  );
}
