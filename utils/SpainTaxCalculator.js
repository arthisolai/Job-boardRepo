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
    <div className="p-8 bg-white shadow-lg rounded-md border border-gray-300">
      <div className="flex flex-row">
        {/* Left side */}
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold text-center mb-4">
            Spain Tax Calculator
          </h1>
          <p className="text-lg mb-4">Net Salary calculator for Spain.</p>
          <p className="text-lg">
            Wondering how much money you would earn in Spain? You’re in the
            right place.
          </p>
        </div>

        {/* Right side */}
        <div className="w-1/2 p-4">
          <form className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700" htmlFor="income">
                Annual Income:
              </label>
              <input
                type="range"
                id="income"
                className="p-2 border rounded-md w-full" // Adjusted width
                min="15000"
                max="150000"
                step="1000"
                value={income}
                onChange={(e) => setIncome(parseInt(e.target.value))}
              />
              <output htmlFor="income">{income} €</output>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-lg mb-2">
              <span className="font-medium">Annual Net Income:</span> €
              {netIncome.annualNet}
            </p>
            <p className="text-lg">
              <span className="font-medium">Monthly Net Income:</span> €
              {netIncome.monthlyNet}
            </p>
          </div>
          <div className="mt-8 text-gray-600">
            <h2 className="text-m font-medium mb-4">Salary Information:</h2>
            <p className="text-sm mb-4">
              A minimum base salary for Software Developers, DevOps, QA, and
              other tech professionals in{" "}
              <span className="text-blue-500 font-bold">Spain</span> starts at{" "}
              <span className="text-blue-500 font-bold">€ 19000</span> per year.
              At the same time, more leading roles like Software Architect, Team
              Lead, Tech Lead, or Engineering Manager can bring you a gross
              annual income of{" "}
              <span className="text-blue-500 font-bold">€ 55000</span> without
              bonuses.
            </p>
            <p className="text-xs text-gray-500">
              (Note: The figures are imprecise and reflect the approximate
              salary range for tech professionals in this country.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
