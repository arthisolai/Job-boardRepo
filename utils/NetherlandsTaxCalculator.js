import React, { useState, useEffect } from "react";

export default function NetherlandsTaxCalculator() {
  const [income, setIncome] = useState(0);
  const [isRulingApplied, setIsRulingApplied] = useState(false);
  const [netIncome, setNetIncome] = useState(0);

  useEffect(() => {
    function calculateTax(income) {
      let tax = 0;
      if (income <= 68507) {
        tax = income * 0.371;
      } else {
        tax = 68507 * 0.371 + (income - 68507) * 0.495;
      }
      return tax;
    }

    let taxableIncome = income;
    if (isRulingApplied) {
      taxableIncome = income * 0.7;
    }

    const taxAmount = calculateTax(taxableIncome);
    const net = income - taxAmount;

    setNetIncome(parseFloat(net.toFixed(2)));
  }, [income, isRulingApplied]);

  return (
    <div>
      <h1>Netherlands Tax Calculator</h1>
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
          <label>
            <input
              type="checkbox"
              checked={isRulingApplied}
              onChange={() => setIsRulingApplied(!isRulingApplied)}
            />
            Apply 30% ruling
          </label>
        </div>
      </form>
      <div>
        <h2>Results:</h2>
        <p>Annual Net Income: €{netIncome}</p>
      </div>
    </div>
  );
}
