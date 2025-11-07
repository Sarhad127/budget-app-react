import { useState } from "react";

function BankTable({ banks, onPaid, onDelete, onCostChange, onTotalChange }) {
  const [editingCostId, setEditingCostId] = useState(null);
  const [editingTotalId, setEditingTotalId] = useState(null);
  const [newCost, setNewCost] = useState("");
  const [newTotal, setNewTotal] = useState("");

  const handleEditCost = (bank) => {
    setEditingCostId(bank.id);
    setNewCost(bank.cost);
  };

  const handleEditTotal = (bank) => {
    setEditingTotalId(bank.id);
    setNewTotal(bank.total);
  };

  const handleSaveCost = (id) => {
    if (!isNaN(newCost) && newCost !== "") {
      onCostChange(id, parseFloat(newCost));
    }
    setEditingCostId(null);
  };

  const handleSaveTotal = (id) => {
    if (!isNaN(newTotal) && newTotal !== "") {
      onTotalChange(id, parseFloat(newTotal));
    }
    setEditingTotalId(null);
  };

  const handleKeyDown = (e, id, type) => {
    if (e.key === "Enter") {
      type === "cost" ? handleSaveCost(id) : handleSaveTotal(id);
    }
  };

  const totalAmount = banks.reduce((sum, bank) => sum + bank.total, 0);
  const totalMonthly = banks.reduce((sum, bank) => sum + bank.cost, 0);

  return (
    <div>
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

                {/* Totalt kvar */}
                <td>
                  {editingTotalId === bank.id ? (
                    <input
                      type="number"
                      value={newTotal}
                      autoFocus
                      onChange={(e) => setNewTotal(e.target.value)}
                      onBlur={() => handleSaveTotal(bank.id)}
                      onKeyDown={(e) => handleKeyDown(e, bank.id, "total")}
                    />
                  ) : (
                    <span onClick={() => handleEditTotal(bank)}>
                      {bank.total.toFixed(2)}
                    </span>
                  )}
                </td>

                {/* Månadsbelopp */}
                <td>
                  {editingCostId === bank.id ? (
                    <input
                      type="number"
                      value={newCost}
                      autoFocus
                      onChange={(e) => setNewCost(e.target.value)}
                      onBlur={() => handleSaveCost(bank.id)}
                      onKeyDown={(e) => handleKeyDown(e, bank.id, "cost")}
                    />
                  ) : (
                    <span onClick={() => handleEditCost(bank)}>
                      {bank.cost.toFixed(2)}
                    </span>
                  )}
                </td>

                <td>
                  <button className="paid-btn" onClick={() => onPaid(bank.id)}>
                    Betald
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(bank.id)}
                  >
                    Radera
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

        {banks.length > 0 && (
          <tfoot>
            <tr>
              <td style={{ fontWeight: "600" }}>Totalt</td>
              <td style={{ fontWeight: "600" }}>{totalAmount.toFixed(2)}</td>
              <td style={{ fontWeight: "600" }}>{totalMonthly.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        )}
      </table>
      <div className="total-amount">Totalt kvar: {totalAmount.toFixed(2)} kr</div>
    </div>
  );
}

export default BankTable;
