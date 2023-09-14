import React, { useState, useEffect } from "react";

export default function PortugalTaxCalculator() {
  const [income, setIncome] = useState(15000);
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
      if (income <= 7112) {
        taxAmount = income * 0.145;
      } else if (income <= 10732) {
        taxAmount = 7112 * 0.145 + (income - 7112) * 0.25;
      } else if (income <= 20322) {
        taxAmount =
          7112 * 0.145 + (10732 - 7112) * 0.25 + (income - 10732) * 0.285;
      } else if (income <= 25075) {
        taxAmount =
          7112 * 0.145 +
          (10732 - 7112) * 0.25 +
          (20322 - 10732) * 0.285 +
          (income - 20322) * 0.35;
      } else if (income <= 36967) {
        taxAmount =
          7112 * 0.145 +
          (10732 - 7112) * 0.25 +
          (20322 - 10732) * 0.285 +
          (25075 - 20322) * 0.35 +
          (income - 25075) * 0.37;
      } else if (income <= 80882) {
        taxAmount =
          7112 * 0.145 +
          (10732 - 7112) * 0.25 +
          (20322 - 10732) * 0.285 +
          (25075 - 20322) * 0.35 +
          (36967 - 25075) * 0.37 +
          (income - 36967) * 0.45;
      } else {
        taxAmount =
          7112 * 0.145 +
          (10732 - 7112) * 0.25 +
          (20322 - 10732) * 0.285 +
          (25075 - 20322) * 0.35 +
          (36967 - 25075) * 0.37 +
          (80882 - 36967) * 0.45 +
          (income - 80882) * 0.48;
      }

      const netIncome = income - taxAmount;

      setAnnualNet(netIncome);
      setMonthlyNet(netIncome / 12);
    };

    calculateTax();
  }, [income]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-center mb-4">
        Portugal Tax Calculator
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
            min="15000"
            max="150000"
            step="1000"
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
          />
          {/* <span className="text-center text-blue-500 font-bold">
            € {income.toFixed(0)}
          </span> */}
        </div>
      </form>

      <div className="mt-6">
        <p className="text-lg mb-2">
          <span className="font-medium">Annual Net Income:</span> €
          {annualNet.toFixed(2)}
        </p>
        <p className="text-lg">
          <span className="font-medium">Monthly Net Income:</span> €
          {monthlyNet.toFixed(2)}
        </p>
      </div>

      <div className="mt-6 text-gray-600">
        <h2 className="text-m font-medium mb-4">Salary Information:</h2>
        <p className="text-sm mb-4">
          A minimum base salary for Software Developers, DevOps, QA, and other
          tech professionals in{" "}
          <span className="text-blue-500 font-bold">Portugal</span> starts at{" "}
          <span className="text-blue-500 font-bold">€ 15000</span> per year. At
          the same time, more leading roles like Software Architect, Team Lead,
          Tech Lead, or Engineering Manager can bring you a gross annual income
          of <span className="text-blue-500 font-bold">€ 43000</span> without
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
