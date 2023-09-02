import React, { useState, useEffect } from "react";

export default function SpainTaxCalculator() {
  const [income, setIncome] = useState(0);
  const [netIncome, setNetIncome] = useState({ annualNet: 0, monthlyNet: 0 });

  useEffect(() => {
    function calculateTax(income) {
      let tax = 0;
      if (income <= 12450) {
        tax = income * 0.19;
      } else if (income <= 20200) {
        tax = 12450 * 0.19 + (income - 12450) * 0.24;
      } else if (income <= 35200) {
        tax = 12450 * 0.19 + (20200 - 12450) * 0.24 + (income - 20200) * 0.3;
      } else if (income <= 60000) {
        tax =
          12450 * 0.19 +
          (20200 - 12450) * 0.24 +
          (35200 - 20200) * 0.3 +
          (income - 35200) * 0.37;
      } else {
        tax =
          12450 * 0.19 +
          (20200 - 12450) * 0.24 +
          (35200 - 20200) * 0.3 +
          (60000 - 35200) * 0.37 +
          (income - 60000) * 0.45;
      }
      return tax;
    }

    const taxAmount = calculateTax(income);
    const net = income - taxAmount;
    const monthlyNet = net / 12;

    setNetIncome({
      annualNet: parseFloat(net.toFixed(2)),
      monthlyNet: parseFloat(monthlyNet.toFixed(2)),
    });
  }, [income]);

  return (
    <div>
      <h1>Spain Tax Calculator</h1>
      <form>
        <div>
          <label>Annual Income: </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
          />
        </div>
      </form>
      <div>
        <h2>Results:</h2>
        <p>Annual Net Income: €{netIncome.annualNet}</p>
        <p>Monthly Net Income: €{netIncome.monthlyNet}</p>
      </div>
    </div>
  );
}
