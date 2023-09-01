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
          <label>Marital Status: </label>
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>
        <div>
          <label>Number of Children: </label>
          <input
            type="number"
            value={numberOfChildren}
            onChange={(e) => setNumberOfChildren(parseInt(e.target.value))}
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
        <p>Monthly Net Income: €{monthlyNetIncome}</p>
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
