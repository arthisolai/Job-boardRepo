import React, { useState, useEffect } from "react";

export default function NetherlandsTaxCalculator() {
  const [income, setIncome] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  const [monthlyNetIncome, setMonthlyNetIncome] = useState(0);
  const [isRulingApplied, setIsRulingApplied] = useState(false);

  useEffect(() => {
    function calculateTax(income, maritalStatus, numberOfChildren) {
      let tax = 0;
      if (maritalStatus === "single") {
        if (income <= 38104) {
          tax = income * 0.371;
        } else {
          tax = 38104 * 0.371 + (income - 38104) * 0.495;
        }
      } else if (maritalStatus === "married") {
        if (income <= 76208) {
          tax = income * 0.371;
        } else {
          tax = 76208 * 0.371 + (income - 76208) * 0.495;
        }
      }

      for (let i = 0; i < numberOfChildren; i++) {
        tax -= 2580;
      }

      return tax;
    }

    let taxableIncome = income;
    if (maritalStatus === "married") {
      taxableIncome = income * 0.7;
    }
    if (isRulingApplied) {
      taxableIncome = income * 0.7;
    }
    const taxAmount = calculateTax(
      taxableIncome,
      maritalStatus,
      numberOfChildren
    );
    const net = income - taxAmount;

    setNetIncome(parseFloat(net.toFixed(2)));
    setMonthlyNetIncome((net / 12).toFixed(2));
  }, [income, maritalStatus, numberOfChildren, isRulingApplied]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-4">
        Netherlands Tax Calculator
      </h1>

      <form className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700" htmlFor="income">
            Annual Income:
          </label>
          <input
            type="range"
            id="income"
            className="p-2 border rounded-md"
            min="15000"
            max="150000"
            step="1000" // Adjust this step value as needed
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
          />
          <output htmlFor="income">{income}</output>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700" htmlFor="maritalStatus">
            Marital Status:
          </label>
          <select
            id="maritalStatus"
            className="p-2 border rounded-md"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            className="font-medium text-gray-700"
            htmlFor="numberOfChildren"
          >
            Number of Children:
          </label>
          <input
            type="number"
            id="numberOfChildren"
            className="p-2 border rounded-md"
            value={numberOfChildren}
            onChange={(e) => setNumberOfChildren(parseInt(e.target.value))}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isRulingApplied"
            className="mr-2"
            checked={isRulingApplied}
            onChange={() => setIsRulingApplied(!isRulingApplied)}
          />
          <label
            htmlFor="isRulingApplied"
            className="font-medium text-gray-700"
          >
            Apply 30% ruling
          </label>
        </div>
      </form>

      <div className="mt-6">
        <h2 className="text-2xl font-medium text-center mb-4">Results:</h2>
        <p className="text-lg mb-2">
          <span className="font-medium">Annual Net Income:</span> €{netIncome}
        </p>
        <p className="text-lg">
          <span className="font-medium">Monthly Net Income:</span> €
          {monthlyNetIncome}
        </p>
      </div>
      <div className="mt-8 text-gray-600">
        <p className="text-sm mb-4">
          A minimum base salary for Software Developers, DevOps, QA, and other
          tech professionals in The{" "}
          <span className="text-blue-500">Netherlands</span> starts at{" "}
          <span className="text-blue-500">€ 40000</span> per year.
        </p>
        <p className="text-sm mb-4">
          At the same time, more leading roles like Software Architect, Team
          Lead, Tech Lead, or Engineering Manager can bring you a gross annual
          income of <span className="text-blue-500">€ 90000</span> without
          bonuses.
        </p>
        <p className="text-xs text-gray-500">
          (Note: These figures are imprecise and reflect the approximate salary
          range for tech professionals in this country.)
        </p>
      </div>
    </div>
  );
}
