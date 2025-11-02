import { useState } from "react";

function BankTable({ banks, onPaid, onDelete, onCostChange }) {
  const [editingId, setEditingId] = useState(null);
  const [newCost, setNewCost] = useState("");

  const handleEditClick = (bank) => {
    setEditingId(bank.id);
    setNewCost(bank.cost);
  };

  const handleSave = (id) => {
    if (!isNaN(newCost) && newCost !== "") {
      onCostChange(id, parseFloat(newCost));
    }
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleSave(id);
    }
  };

  return (
    <table className="bank-table">
      <thead>
        <tr>
          <th>Bank</th>
          <th>Totalt kvar</th>
          <th>Månadsbelopp</th>
          <th>Åtgärd</th>
        </tr>
      </thead>
      <tbody>
        {banks.length === 0 ? (
          <tr>
            <td colSpan="4" className="no-data">
              Ingen data ännu
            </td>
          </tr>
        ) : (
          banks.map((bank) => (
            <tr key={bank.id}>
              <td>{bank.name}</td>
              <td>{bank.total.toFixed(2)}</td>
              <td>
                {editingId === bank.id ? (
                  <input
                    type="number"
                    value={newCost}
                    autoFocus
                    onChange={(e) => setNewCost(e.target.value)}
                    onBlur={() => handleSave(bank.id)}
                    onKeyDown={(e) => handleKeyDown(e, bank.id)}
                  />
                ) : (
                  <span onClick={() => handleEditClick(bank)}>
                    {bank.cost.toFixed(2)}
                  </span>
                )}
              </td>
              <td>
                <button className="paid-btn" onClick={() => onPaid(bank.id)}>
                  Betald
                </button>
                <button className="delete-btn" onClick={() => onDelete(bank.id)}>
                  Radera
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default BankTable;
