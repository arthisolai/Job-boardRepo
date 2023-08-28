import React, { useState, useEffect } from "react";

export default function PayParityCalculator() {
  const [payParityData, setPayParityData] = useState([]);
  const [sourceCountry, setSourceCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [sourceSalary, setSourceSalary] = useState(0);
  const [convertedSalary, setConvertedSalary] = useState(0);

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
    const sourceParity = payParityData.find(
      (item) => item.CountryCode === sourceCountry
    );
    const targetParity = payParityData.find(
      (item) => item.CountryCode === targetCountry
    );
    console.log("Current payParityData state:", payParityData);
    if (!sourceParity || !targetParity) return;

    // Extract years from the keys and filter out non-numeric keys
    const yearsSource = Object.keys(sourceParity)
      .filter((key) => !isNaN(Number(key)))
      .map(Number);
    const yearsTarget = Object.keys(targetParity)
      .filter((key) => !isNaN(Number(key)))
      .map(Number);

    // Find the maximum year that exists in both data sets
    const commonYears = yearsSource.filter((year) =>
      yearsTarget.includes(year)
    );
    const latestYear = Math.max(...commonYears);

    if (!latestYear) {
      console.error("No common year found in the data");
      return;
    }

    const sourceParityValue = sourceParity[latestYear];
    const targetParityValue = targetParity[latestYear];

    if (!sourceParityValue || !targetParityValue) {
      console.error(`Data not available for the year ${latestYear}`);
      return;
    }

    const conversionRate = targetParityValue / sourceParityValue;
    setConvertedSalary(sourceSalary * conversionRate);
  }
  console.log("Current payParityData state:", payParityData);

  return (
    <div>
      <div>
        <label>Source Country:</label>
        <select
          value={sourceCountry}
          onChange={(event) => setSourceCountry(event.target.value)}
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
          onChange={(event) => setSourceSalary(Number(event.target.value))}
        />
      </div>

      <div>
        <label>Target Country:</label>
        <select
          value={targetCountry}
          onChange={(event) => setTargetCountry(event.target.value)}
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
        <input type="text" value={convertedSalary} readOnly />
      </div>
    </div>
  );
}
