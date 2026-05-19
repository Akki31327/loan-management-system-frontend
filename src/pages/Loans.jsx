import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";
import LoanModal from "../components/LoanModal";

import { toast, ToastContainer } from "react-toastify";

function Loans() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | API CALL (WITH PAGINATION)
  |--------------------------------------------------------------------------
  */

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(
    `/loans?search=${search}&status=${status}&page=${page}`,
    [search, status, page]
  );

  /*
  |--------------------------------------------------------------------------
  | DELETE HOOK
  |--------------------------------------------------------------------------
  */

  const { deleteData } = useDelete();

  /*
  |--------------------------------------------------------------------------
  | EXTRACT DATA
  |--------------------------------------------------------------------------
  */

  const loans = data?.data || [];

  const pagination = data?.pagination || {};

  const lastPage = pagination.last_page || 1;
  const currentPage = pagination.current_page || 1;

  /*
  |--------------------------------------------------------------------------
  | HANDLE DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this loan?"
    );

    if (!confirmDelete) return;

    try {
      await deleteData(`/loans/${id}`);

      toast.success("Loan deleted successfully");

      refetch();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | PAGE CHANGE FIX
  |--------------------------------------------------------------------------
  */

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > lastPage) return;
    setPage(newPage);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <LoanModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        refetch={refetch}
        editData={editData}
      />

      <div className="container mt-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Loan Management</h2>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            Add Loan
          </button>
        </div>

        {/* FILTERS */}
        <div className="row mb-4">

          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search customer..."
              className="form-control"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // reset page on search
              }}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1); // reset page on filter
              }}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow">
          <div className="card-body">

            {loading ? (
              <div className="text-center py-4">
                <h5>Loading loans...</h5>
              </div>

            ) : error ? (
              <div className="alert alert-danger">
                Failed to load loans
              </div>

            ) : (

              <>
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Loan No</th>
                      <th>Customer</th>
                      <th>Mobile</th>
                      <th>Loan Amount</th>
                      <th>Pending</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loans.length > 0 ? (
                      loans.map((loan) => (
                        <tr key={loan.id}>
                          <td>{loan.loan_no}</td>
                          <td>{loan.customer_name}</td>
                          <td>{loan.mobile}</td>
                          <td>₹ {loan.loan_amount}</td>
                          <td>₹ {loan.pending_amount}</td>

                          <td>
                            <span
                              className={`badge ${
                                loan.status === "active"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {loan.status}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => {
                                setEditData(loan);
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(loan.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No loans found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <div className="d-flex justify-content-between align-items-center mt-3">

                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                  >
                    Previous
                  </button>

                  <span>
                    Page {currentPage} of {lastPage}
                  </span>

                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === lastPage}
                    onClick={() => changePage(currentPage + 1)}
                  >
                    Next
                  </button>

                </div>

              </>
            )}

          </div>
        </div>

      </div>
    </>
  );
}

export default Loans;