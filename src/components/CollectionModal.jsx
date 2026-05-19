import { useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import api from "../api/axios";

import { toast } from "react-toastify";

function CollectionModal({
  show,
  handleClose,
  refetch,
  editData,
  user, // 👈 pass logged-in user
}) {

  /*
  |--------------------------------------------------------------------------
  | FETCH LOANS
  |--------------------------------------------------------------------------
  */

  const { data } = useFetch("/loans-all");

  const loans = Array.isArray(data?.data)
    ? data.data
    : [];

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [pendingAmount, setPendingAmount] = useState(0);

  const [formData, setFormData] = useState({
    loan_id: "",
    amount_paid: "",
    payment_mode: "Cash",
    location: "",
  });

  const { loading } = usePost();

  /*
  |--------------------------------------------------------------------------
  | FILL DATA WHEN EDIT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (editData) {
      setFormData({
        loan_id: editData.loan_id,
        amount_paid: editData.amount_paid,
        payment_mode: editData.payment_mode,
        location: editData.location,
      });

      setPendingAmount(editData.loan?.pending_amount || 0);
    } else {
      setFormData({
        loan_id: "",
        amount_paid: "",
        payment_mode: "Cash",
        location: "",
      });

      setPendingAmount(0);
    }
  }, [editData]);

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "loan_id") {
      const selectedLoan = loans.find(
        (loan) => loan.id == value
      );

      if (selectedLoan) {
        setPendingAmount(selectedLoan.pending_amount);
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT (CREATE + UPDATE)
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Number(formData.amount_paid) > Number(pendingAmount)
    ) {
      toast.error("Amount exceeds pending amount");
      return;
    }

    try {
      if (editData) {
        await api.put(`/collections/${editData.id}`, formData);
        toast.success("Collection updated successfully");
      } else {
        await api.post("/collections", formData);
        toast.success("Collection added successfully");
      }

      handleClose();
      refetch();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE (ADMIN ONLY)
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id) => {
    if (user?.role !== "admin") {
      toast.error("Only admin can delete collection");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to delete this collection?"
    );

    if (!confirm) return;

    try {
      await api.delete(`/collections/${id}`);

      toast.success("Collection deleted successfully");

      refetch();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">
              {editData ? "Edit Collection" : "Add Collection"}
            </h5>

            <button className="btn-close" onClick={handleClose} />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              {/* LOAN */}
              <div className="mb-3">
                <label>Select Loan</label>

                <select
                  name="loan_id"
                  className="form-select"
                  value={formData.loan_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Loan</option>

                  {loans.map((loan) => (
                    <option key={loan.id} value={loan.id}>
                      {loan.loan_no} - {loan.customer_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PENDING */}
              <div className="mb-3">
                <label>Pending Amount</label>
                <input
                  className="form-control"
                  value={pendingAmount}
                  disabled
                />
              </div>

              {/* AMOUNT */}
              <div className="mb-3">
                <label>Amount Paid</label>
                <input
                  type="number"
                  name="amount_paid"
                  className="form-control"
                  value={formData.amount_paid}
                  onChange={handleChange}
                />
              </div>

              {/* PAYMENT MODE */}
              <div className="mb-3">
                <label>Payment Mode</label>

                <select
                  name="payment_mode"
                  className="form-select"
                  value={formData.payment_mode}
                  onChange={handleChange}
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              {/* LOCATION */}
              <div className="mb-3">
                <label>Location</label>
                <input
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* FOOTER */}
            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : editData
                  ? "Update"
                  : "Save"}
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default CollectionModal;