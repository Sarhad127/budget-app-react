import { useState } from "react";

function BankForm({ onAddBank }) {
  const [bankName, setBankName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [monthlyCost, setMonthlyCost] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bankName || !totalAmount || !monthlyCost) return;

    const newBank = {
      id: Date.now(),
      name: bankName,
      total: parseFloat(totalAmount),
      cost: parseFloat(monthlyCost),
    };

    onAddBank(newBank);

    setBankName("");
    setTotalAmount("");
    setMonthlyCost("");
  };

  return (
    <form className="bank-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Banknamn"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Totalt belopp"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Månadsbelopp"
        value={monthlyCost}
        onChange={(e) => setMonthlyCost(e.target.value)}
      />
      <button type="submit">Lägg till</button>
    </form>
  );
}

export default BankForm;
