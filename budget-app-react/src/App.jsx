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
    const bank = banks.find(b => b.id === id);
    if (window.confirm(`Är du säker på att du vill radera "${bank.name}"?`)) {
      setBanks(banks.filter((b) => b.id !== id));
    }
  };

  const handleCostChange = (id, newCost) => {
    setBanks((prev) =>
      prev.map((bank) => (bank.id === id ? { ...bank, cost: newCost } : bank))
    );
  };

  const handleClearAll = () => {
    if (banks.length === 0) return;
    if (window.confirm("Är du säker på att du vill radera ALLA fakturor?")) {
      setBanks([]);
    }
  };

  const handleExportCSV = () => {
    if (banks.length === 0) return;

    const headers = ["Banknamn", "Totalt kvar", "Månadsbelopp"];
    const rows = banks.map(b => [b.name, b.total, b.cost]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(r => r.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "budget.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1 className="app-title">Budgetkalkylen</h1>
        <BankForm onAddBank={addBank} />
        <BankTable
          banks={banks}
          onPaid={handlePaid}
          onDelete={handleDelete}
          onCostChange={handleCostChange}
        />
          <div >
          <button className="simple-btn" onClick={handleClearAll}>Rensa allt</button>
          <button className="simple-btn" onClick={handleExportCSV}>Exportera CSV</button>
        </div>
      </div>
    </div>
  );
}

export default App;
