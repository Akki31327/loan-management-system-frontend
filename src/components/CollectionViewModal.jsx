function CollectionViewModal({

  show,

  handleClose,

  data,
}) {



  if (!show || !data) return null;



  const formattedDate = new Date(
    data.created_at
  ).toLocaleString();

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >

      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          {/* HEADER */}

          <div className="modal-header bg-dark text-white">

            <h5 className="modal-title">

              Collection Details

            </h5>

            <button
              className="btn-close btn-close-white"
              onClick={handleClose}
            ></button>

          </div>

          {/* BODY */}

          <div className="modal-body">

            <div className="row">

              {/* LOAN INFO */}

              <div className="col-md-6 mb-3">

                <div className="card shadow-sm">

                  <div className="card-body">

                    <h5 className="mb-3">
                      Loan Information
                    </h5>

                    <p>
                      <strong>Loan No:</strong>{" "}
                      {data.loan?.loan_no}
                    </p>

                    <p>
                      <strong>Customer:</strong>{" "}
                      {
                        data.loan
                          ?.customer_name
                      }
                    </p>

                    <p>
                      <strong>Mobile:</strong>{" "}
                      {
                        data.loan?.mobile
                      }
                    </p>

                    <p>
                      <strong>EMI Amount:</strong>{" "}
                      ₹
                      {
                        data.loan
                          ?.emi_amount
                      }
                    </p>

                  </div>

                </div>

              </div>

              {/* COLLECTION INFO */}

              <div className="col-md-6 mb-3">

                <div className="card shadow-sm">

                  <div className="card-body">

                    <h5 className="mb-3">
                      Collection Information
                    </h5>

                    <p>
                      <strong>
                        Amount Paid:
                      </strong>{" "}
                      ₹
                      {
                        data.amount_paid
                      }
                    </p>

                    <p>
                      <strong>
                        Payment Mode:
                      </strong>{" "}

                      <span
                        className={`badge ${
                          data.payment_mode ===
                          "Cash"
                            ? "bg-success"
                            : data.payment_mode ===
                              "UPI"
                            ? "bg-primary"
                            : "bg-warning"
                        }`}
                      >
                        {
                          data.payment_mode
                        }
                      </span>

                    </p>

                    <p>
                      <strong>
                        Location:
                      </strong>{" "}
                      {
                        data.location ||
                        "N/A"
                      }
                    </p>

                    <p>
                      <strong>
                        Collection Date:
                      </strong>{" "}
                      {formattedDate}
                    </p>

                  </div>

                </div>

              </div>

              {/* PENDING SECTION */}

              <div className="col-md-12">

                <div className="alert alert-info">

                  <strong>
                    Remaining Pending Amount:
                  </strong>{" "}
                  ₹
                  {
                    data.loan
                      ?.pending_amount
                  }

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CollectionViewModal;