import { useEffect, useState } from "react";

import usePost from "../hooks/usePost";
import useUpdate from "../hooks/useUpdate";

import { toast } from "react-toastify";

function LoanModal({

  show,
  handleClose,
  refetch,
  editData = null,
}) {


  const { postData, loading } = usePost();

  const { updateData, loading: updateLoading } =
    useUpdate();

  

  const [formData, setFormData] = useState({

    loan_no: "",

    customer_name: "",

    mobile: "",

    address: "",

    loan_amount: "",

    emi_amount: "",
  });

 

 useEffect(() => {

  

  if (editData) {

    setFormData({

      loan_no: editData.loan_no || "",

      customer_name:
        editData.customer_name || "",

      mobile: editData.mobile || "",

      address: editData.address || "",

      loan_amount: editData.loan_amount || "",

      emi_amount: editData.emi_amount || "",
    });

  } else {

   
    setFormData({

      loan_no: "",

      customer_name: "",

      mobile: "",

      address: "",

      loan_amount: "",

      emi_amount: "",
    });
  }

}, [editData, show]);

  

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };


  // HANDLE SUBMIT
 

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      
      // UPDATE
    

      if (editData?.id) {

  await updateData(
    `/loans/${editData.id}`,
    formData
  );

  toast.success("Loan updated successfully");

        } else {

        await postData("/loans", formData);

        toast.success("Loan created successfully");
        }

      refetch();

      handleClose();


      // RESET FORM
  

      setFormData({

        loan_no: "",

        customer_name: "",

        mobile: "",

        address: "",

        loan_amount: "",

        emi_amount: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

 

  if (!show) return null;

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

          <div className="modal-header">

            <h5 className="modal-title">

              {editData
                ? "Edit Loan"
                : "Add Loan"}

            </h5>

            <button
              className="btn-close"
              onClick={handleClose}
            ></button>

          </div>

          {/* BODY */}

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              <div className="row">

                {/* LOAN NO */}

                <div className="col-md-6 mb-3">

                  <label>Loan No</label>

                  <input
                    type="text"
                    name="loan_no"
                    className="form-control"
                    value={formData.loan_no}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* CUSTOMER */}

                <div className="col-md-6 mb-3">

                  <label>Customer Name</label>

                  <input
                    type="text"
                    name="customer_name"
                    className="form-control"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* MOBILE */}

                <div className="col-md-6 mb-3">

                  <label>Mobile</label>

                  <input
  type="tel"
  inputMode="numeric"
  pattern="[0-9]*"
  maxLength={10}
  className="form-control"
  name="mobile"
  value={formData.mobile}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, mobile: value.slice(0, 10) });
  }}
/>

                </div>

                {/* LOAN AMOUNT */}

                <div className="col-md-6 mb-3">

                  <label>Loan Amount</label>

                  <input
                    type="number"
                    name="loan_amount"
                    className="form-control"
                    value={formData.loan_amount}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* EMI */}

                <div className="col-md-6 mb-3">

                  <label>EMI Amount</label>

                  <input
                    type="number"
                    name="emi_amount"
                    className="form-control"
                    value={formData.emi_amount}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* ADDRESS */}

                <div className="col-md-12 mb-3">

                  <label>Address</label>

                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

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
                disabled={loading || updateLoading}
              >

                {loading || updateLoading
                  ? "Please wait..."
                  : editData
                  ? "Update Loan"
                  : "Create Loan"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default LoanModal;