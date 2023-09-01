import React, { useState, useEffect } from "react";

export default function GermanTaxCalculator() {
  const [income, setIncome] = useState(0);
  const [taxClass, setTaxClass] = useState("1");
  const [annualNet, setAnnualNet] = useState(0);
  const [monthlyNet, setMonthlyNet] = useState(0);

  useEffect(() => {
    const calculateTax = () => {
      if (isNaN(income) || income === null || income === "") {
        setAnnualNet(0);
        setMonthlyNet(0);
        return;
      }
      let taxAmount = 0;
      if (income <= 9744) {
        taxAmount = 0;
      } else if (income > 9744 && income <= 57918) {
        const y = (income - 9744) / 10000;
        taxAmount = (997.8 * y + 1400) * y;
      } else if (income > 57918 && income <= 274612) {
        taxAmount = 0.42 * (income - 57918) + 23967.43;
      } else {
        taxAmount = 0.45 * (income - 274612) + 121365.22;
      }

      switch (taxClass) {
        case "I":
          break;
        case "II":
          taxAmount *= 0.9;
          break;
        case "III":
          taxAmount *= 0.8;
          break;
        case "IV":
          taxAmount *= 1.1;
          break;
        case "V":
          taxAmount *= 1.2;
          break;
        case "VI":
          taxAmount *= 1.1;
          break;
        default:
          break;
      }

      const netIncome = income - taxAmount;

      setAnnualNet(netIncome);
      setMonthlyNet(netIncome / 12);
    };

    calculateTax();
  }, [income, taxClass]);

  return (
    <div>
      <h1>German Tax Calculator</h1>
      <form>
        <div>
          <label>Annual Income: </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label>Tax Class: </label>
          <select
            value={taxClass}
            onChange={(e) => setTaxClass(e.target.value)}
          >
            <option value="I">TaxClass 1 - Single</option>
            <option value="II">TaxClass 2 - Single with child</option>
            <option value="III">
              TaxClass 3 - Married (Higher-earning spouse)
            </option>
            <option value="IV">
              TaxClass 4 - Married (Both spouses earn similarly)
            </option>
            <option value="V">
              TaxClass 5 - Married (Lower-earning spouse)
            </option>
            <option value="VI">TaxClass 6 - Secondary Income</option>
          </select>
        </div>
      </form>
      <div>
        <h2>Results:</h2>
        <p>Annual Net Income: €{annualNet.toFixed(2)}</p>
        <p>Monthly Net Income: €{monthlyNet.toFixed(2)}</p>
      </div>
    </div>
  );
}
