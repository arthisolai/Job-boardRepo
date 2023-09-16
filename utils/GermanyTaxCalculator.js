import React, { useState, useEffect } from "react";

export default function GermanTaxCalculator() {
  const [income, setIncome] = useState(15000);
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
    <div className=" mx-8 p-4 bg-white shadow-lg rounded-md border border-gray-300">
      <div className=" flex flex-row">
        {/* Left side */}
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold text-center mb-4">
            How much could you make in Germany?
          </h1>
          <p className="text-lg mb-4">Net Salary calculator for Germany.</p>
          <p className="text-lg">
            Wondering how much money you would earn in a different country?
            You’re in the right place.
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
                type="range" // Use range input type
                id="income"
                className="p-2 border rounded-md"
                min="15000" // Minimum value
                max="150000" // Maximum value
                step="1000" // Step increment
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value))}
              />
              {/* Display the income value */}
              <span className="text-center">€ {income.toFixed(0)}</span>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700" htmlFor="taxClass">
                Tax Class:
              </label>
              <select
                id="taxClass"
                className="p-2 border rounded-md"
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

          <div className="mt-6">
            {/* <h2 className="text-2xl font-medium text-center mb-4">Results:</h2> */}
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
              A minimum base salary for Software Developers, DevOps, QA, and
              other tech professionals in{" "}
              <span className="text-blue-500 font-bold">Germany</span> starts at{" "}
              <span className="text-blue-500 font-bold">€ 40000 </span>per year.
              At the same time, more leading roles like Software Architect, Team
              Lead, Tech Lead, or Engineering Manager can bring you a gross
              annual income of{" "}
              <span className="text-blue-500 font-bold">€ 90000</span> without
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
