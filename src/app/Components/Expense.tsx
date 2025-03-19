// This Enable page to can change in the client side // convert to client side component
"use client"; 
// import of React hook useState from react Library
import { useState , useEffect } from "react";

type Expense = {
    ExpenseType: string;
    Cost: number;
  };

export default function Expense() {
    // Use of React hook useState
    const [number, setNumber] = useState<number | undefined>(undefined);
    const [isFirstClick, setIsFirstClick] = useState(true);
    const [text, setText] = useState("Enter Text Here");
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    // Display Content When Page is Mounted
    useEffect(() => {
        setIsMounted(true);
        const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
        setExpenses(savedExpenses);
      }, []);

    // TO Input The Name of Expense
    const handleonchange = (event:React.ChangeEvent<HTMLInputElement>) => { 
        setText(event.target.value)
    };

    // TO Input The Cost of Expense
    const handleonchangecost = (event:React.ChangeEvent<HTMLInputElement>) => { 
        const value = parseFloat(event.target.value) || 0;
        setNumber(value);
    };

    // Handle First Click to Erase The Initial Text  
    const handleClick = () => {
        if (isFirstClick) {
            setText('');
            setIsFirstClick(false);
        }
    };

    // Action Accured when Add Expense is Clicked
    const setdata = () => {
        if (text !== '' && number !== undefined||0) { // Run Only When Text and Number are Specified
            const newExpense: Expense = {
                ExpenseType: text,
                Cost: Number(number),
            };

            // Update Data When Generated New Expense 
            const updatedExpenses = [...expenses, newExpense];

            // Save Updated Expenses List to LocalStorage
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
            setExpenses(updatedExpenses);
            setIsFirstClick(true);
            setText("Enter Text Here");
            setNumber(0); 
        } else {  // Run  When Text and Number are not Specified
            alert("Please enter all details");
            setIsFirstClick(true);
            setText("Enter Text Here");
            setNumber(0); 
        }
    };

    // Cancel The Value of Input and Make It Default
    const canceldata = () => {
        setIsFirstClick(true);
        setText("Enter Text Here");
        setNumber(0);
    };
  
    return (
        <div className="p-4 text-center flex flex-col justify-center">

            {/* Input of Expense Type */}
            <input type="text"  id="expense" name="expense" value={text ?? ""}
                onClick={handleClick} 
                onChange={handleonchange} 
                className="my-2 mx-6 px-4 py-2 bg-blue-500 text-white rounded  h-10"
            />
            
            {/* Input of Expense Cost */}
            <input type="number"  id="expense-amount" name="expense-amount" value={number !== undefined ? number : ""}
                onChange={handleonchangecost} 
                className="my-2 mx-6 px-4 py-2 bg-blue-500 text-white rounded h-10"
            />
            
            <div className="flex">
                {/* Add Button to Save Expense */}
                <button onClick={setdata} className="m-6 px-4 py-2 w-1/2 bg-blue-500 rounded-full h-10">
                    ✅Add
                </button>
                {/* cancel Button to cancel expense */}
                <button onClick={canceldata} className="m-6 px-4 py-2 w-1/2 bg-blue-500 rounded-full h-10">
                    ❌cancel
                </button>
            </div>

            <div>
                {/* Display Expense Data */}
                {isMounted && (expenses ?? []).map((expense) => ( // .map function used to display all the Expenses
                    <div key={expense.Cost} className="p-3 border rounded bg-gray-900 text-white">
                        <h2 className="text-lg font-semibold">📌 Expense Summary:</h2>
                        <p className="text-lg">📝 Type: {expense.ExpenseType}</p>
                        <p className="text-lg">💲 Cost: ₹{expense.Cost}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}