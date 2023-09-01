import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;
export default function PayParityCalculator() {
  const [payParityData, setPayParityData] = useState([]);
  const [sourceCountry, setSourceCountry] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [sourceSalary, setSourceSalary] = useState("");
  const [convertedSalary, setConvertedSalary] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/parity");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPayParityData(data);
      } catch (error) {
        console.error("Failed to fetch pay parity data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function calculateConvertedSalary() {
      const sourceParity = payParityData.find(
        (item) => item.CountryCode === sourceCountry
      );
      const targetParity = payParityData.find(
        (item) => item.CountryCode === targetCountry
      );

      if (!sourceParity || !targetParity) return;

      const yearsSource = Object.keys(sourceParity)
        .filter((key) => !isNaN(Number(key)))
        .map(Number);
      const yearsTarget = Object.keys(targetParity)
        .filter((key) => !isNaN(Number(key)))
        .map(Number);

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
      const roundedConvertedSalary = (sourceSalary * conversionRate).toFixed(2);
      setConvertedSalary(roundedConvertedSalary);
    }
    if (sourceCountry && targetCountry && sourceSalary) {
      calculateConvertedSalary();
    } else {
      setConvertedSalary("");
    }
  }, [sourceCountry, targetCountry, sourceSalary, payParityData]);

  return (
    <ContentContainer>
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
      <div>
        <label>Converted Salary in :</label>
        <input
          type="text"
          value={convertedSalary}
          readOnly
          style={{ color: "black" }}
        />
      </div>
    </ContentContainer>
  );
}
