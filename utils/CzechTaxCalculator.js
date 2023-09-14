import React, { useState, useEffect } from "react";

export default function CzechTaxCalculator() {
  const [income, setIncome] = useState(720000);
  const [annualNet, setAnnualNet] = useState(0);
  const [monthlyNet, setMonthlyNet] = useState(0);
  const [convertedAnnualNet, setConvertedAnnualNet] = useState(0);
  const [convertedMonthlyNet, setConvertedMonthlyNet] = useState(0);

  const euroToCzechKronaRate = 25.45;
  const dollarToCzechKronaRate = 21.75;

  useEffect(() => {
    const calculateTax = () => {
      if (isNaN(income) || income === null || income === "") {
        setAnnualNet(0);
        setMonthlyNet(0);
        return;
      }

      let taxAmount = 0;
      if (income <= 11000) {
        taxAmount = income * 0.15;
      } else if (income <= 85528) {
        taxAmount = 11000 * 0.15 + (income - 11000) * 0.23;
      } else {
        taxAmount =
          11000 * 0.15 + (85528 - 11000) * 0.23 + (income - 85528) * 0.32;
      }

      const netIncome = income - taxAmount;

      setAnnualNet(netIncome);
      setMonthlyNet(netIncome / 12);

      // Convert net income to Euro and Dollar
      setConvertedAnnualNet((netIncome / euroToCzechKronaRate).toFixed(2));
      setConvertedMonthlyNet(
        (netIncome / 12 / euroToCzechKronaRate).toFixed(2)
      );
    };

    calculateTax();
  }, [income]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-4">
        Czech Republic Tax Calculator
      </h1>

      <form className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-700" htmlFor="income">
            Annual Income:
          </label>
          <input
            type="range"
            id="income"
            className="p-2 border rounded-md bg-blue-200 appearance-none w-full h-2 mt-2"
            min="390000"
            max="1750000"
            step="10000"
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
          />
          <span className="text-center text-blue-500 font-bold">
            Kč {income.toLocaleString()}
          </span>
        </div>
      </form>

      <div className="mt-6">
        <div>
          <p className="text-lg">
            <span className="font-medium">Annual Net Income:</span> Kč
            {annualNet.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm mb-2">
            <span className="text-sm text-gray-500">(</span>
            {convertedAnnualNet} € /{" "}
            {(annualNet / dollarToCzechKronaRate).toFixed(2)} $
            <span className="text-sm text-gray-500">)</span>
          </p>
        </div>
        <div>
          <p className="text-lg">
            <span className="font-medium">Monthly Net Income:</span> Kč
            {(monthlyNet / 12).toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm">
            <span className="text-sm text-gray-500">(</span>
            {convertedMonthlyNet} € /{" "}
            {(monthlyNet / 12 / dollarToCzechKronaRate).toFixed(2)} $
            <span className="text-sm text-gray-500">)</span>
          </p>
        </div>
      </div>

      <div className="mt-6 text-gray-600">
        <h2 className="text-m font-medium mb-4">Salary Information:</h2>
        <p className="text-sm mb-4">
          A minimum base salary for Software Developers, DevOps, QA, and other
          tech professionals in{" "}
          <span className="text-blue-500 font-bold">Czech Republic</span> starts
          at <span className="text-blue-500 font-bold">Kč 720,000</span> per
          year. At the same time, more leading roles like Software Architect,
          Team Lead, Tech Lead, or Engineering Manager can bring you a gross
          annual income of{" "}
          <span className="text-blue-500 font-bold">Kč 1,440,000</span> without
          bonuses.
        </p>

        <p className="text-xs text-gray-500">
          (Note: The figures are imprecise and reflect the approximate salary
          range for tech professionals in this country.)
        </p>
      </div>
    </div>
  );
}
