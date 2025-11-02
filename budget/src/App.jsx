import { useState, useEffect } from "react";
import BankForm from "./components/BankForm";
import BankTable from "./components/BankTable";
import "./App.css";

function App() {
  const [banks, setBanks] = useState(() => {
    const saved = localStorage.getItem("banks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("banks", JSON.stringify(banks));
  }, [banks]);

  const addBank = (bank) => {
    setBanks([...banks, bank]);
  };

  const handlePaid = (id) => {
    setBanks((prev) =>
      prev.map((bank) =>
        bank.id === id
          ? { ...bank, total: Math.max(0, bank.total - bank.cost) }
          : bank
      )
    );
  };

  const handleDelete = (id) => {
    setBanks(banks.filter((b) => b.id !== id));
  };

  const handleCostChange = (id, newCost) => {
    setBanks((prev) =>
      prev.map((bank) => (bank.id === id ? { ...bank, cost: newCost } : bank))
    );
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1>💰 Budget Tracker</h1>
        <BankForm onAddBank={addBank} />
        <BankTable
          banks={banks}
          onPaid={handlePaid}
          onDelete={handleDelete}
          onCostChange={handleCostChange}
        />
      </div>
    </div>
  );
}

export default App;
