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

    const taxAmount = calculateTax(
      taxableIncome,
      maritalStatus,
      numberOfChildren
    );
    const net = income - taxAmount;

    setNetIncome(parseFloat(net.toFixed(2)));
    setMonthlyNetIncome((net / 12).toFixed(2));
  }, [income, maritalStatus, numberOfChildren]);

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
            type="number"
            id="income"
            className="p-2 border rounded-md"
            value={income}
            onChange={(e) => setIncome(parseFloat(e.target.value))}
          />
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
    </div>
  );
}
//   const [income, setIncome] = useState(0);
//   const [isRulingApplied, setIsRulingApplied] = useState(false);
//   const [netIncome, setNetIncome] = useState(0);
//   const [monthlyNetIncome, setMonthlyNetIncome] = useState(0);

//   useEffect(() => {
//     function calculateTax(income) {
//       let tax = 0;
//       if (income <= 68507) {
//         tax = income * 0.371;
//       } else {
//         tax = 68507 * 0.371 + (income - 68507) * 0.495;
//       }
//       return tax;
//     }

//     let taxableIncome = income;
//     if (isRulingApplied) {
//       taxableIncome = income * 0.7;
//     }

//     const taxAmount = calculateTax(taxableIncome);
//     const net = income - taxAmount;

//     setNetIncome(parseFloat(net.toFixed(2)));
//     setMonthlyNetIncome((net / 12).toFixed(2));
//   }, [income, isRulingApplied]);

//   return (
//     <div>
//       <h1>Netherlands Tax Calculator</h1>
//       <form>
//         <div>
//           <label>Annual Income: </label>
//           <input
//             type="number"
//             value={income}
//             onChange={(e) => setIncome(parseFloat(e.target.value))}
//           />
//         </div>
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={isRulingApplied}
//               onChange={() => setIsRulingApplied(!isRulingApplied)}
//             />
//             Apply 30% ruling
//           </label>
//         </div>
//       </form>
//       <div>
//         <h2>Results:</h2>
//         <p>Annual Net Income: €{netIncome}</p>
//         <p>Monthly Net Income: €{monthlyNetIncome}</p>
//       </div>
//     </div>
//   );
// }
