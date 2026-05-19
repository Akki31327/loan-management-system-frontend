import { useState } from "react";

import Navbar from "../components/Navbar";
import CollectionModal from "../components/CollectionModal";

import useFetch from "../hooks/useFetch";
import useDelete from "../hooks/useDelete";

import { ToastContainer, toast } from "react-toastify";

function Collections() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);

  const [paymentMode, setPaymentMode] = useState("");
  const [date, setDate] = useState("");

  const [editData, setEditData] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | FETCH COLLECTIONS
  |--------------------------------------------------------------------------
  */

  const { data, loading, refetch } = useFetch(
    `/collections?page=${page}&payment_mode=${paymentMode}&date=${date}`,
    [page, paymentMode, date]
  );

  const collections = data?.data || [];

  const pagination = data?.pagination || {};

  const lastPage = pagination.last_page || 1;
  const currentPage = pagination.current_page || 1;

  /*
  |--------------------------------------------------------------------------
  | DELETE HOOK
  |--------------------------------------------------------------------------
  */

  const { deleteData } = useDelete();

  const handleDelete = async (id) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.role !== "admin") {
      toast.error("Only admin can delete collection");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to delete this collection?"
    );

    if (!confirm) return;

    try {
      await deleteData(`/collections/${id}`);

      toast.success("Collection deleted successfully");

      refetch();

    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > lastPage) return;
    setPage(newPage);
  };

  /*
  |--------------------------------------------------------------------------
  | FILTERS
  |--------------------------------------------------------------------------
  */

  const handlePaymentMode = (e) => {
    setPaymentMode(e.target.value);
    setPage(1);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setPaymentMode("");
    setDate("");
    setPage(1);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      {/* MODAL */}
      <CollectionModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditData(null);
        }}
        refetch={refetch}
        editData={editData}
      />

      <div className="container mt-4">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Collection Entries</h2>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            Add Collection
          </button>
        </div>

        {/* FILTERS */}
        <div className="row mb-3">

          <div className="col-md-3">
            <select
              className="form-select"
              value={paymentMode}
              onChange={handlePaymentMode}
            >
              <option value="">All Payment Modes</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={handleDate}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

        </div>

        {/* TABLE */}
        <div className="card shadow">
          <div className="card-body">

            {loading ? (
              <h5 className="text-center">Loading...</h5>
            ) : (
              <>
                <table className="table table-bordered">

                  <thead className="table-dark">
                    <tr>
                      <th>Loan No</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Payment Mode</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {collections.length > 0 ? (
                      collections.map((collection) => (
                        <tr key={collection.id}>

                          <td>{collection.loan?.loan_no}</td>
                          <td>{collection.loan?.customer_name}</td>
                          <td>₹ {collection.amount_paid}</td>
                          <td>{collection.payment_mode}</td>
                          <td>{collection.location}</td>

                          <td>
                            {new Date(collection.created_at).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>

                          <td>

                            {/* EDIT */}
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => {
                                setEditData(collection);
                                setShowModal(true);
                              }}
                            >
                              Edit
                            </button>

                            {/* DELETE */}
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(collection.id)}
                            >
                              Delete
                            </button>

                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No collections found
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

export default Collections;