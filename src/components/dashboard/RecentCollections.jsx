function RecentCollections({

  collections,
}) {

  return (
    <div className="card shadow border-0">

      <div className="card-body">

        <h5 className="mb-4">
          Recent Collections
        </h5>

        <table className="table">

          <thead>

            <tr>

              <th>Customer</th>

              <th>Amount</th>

              <th>Mode</th>

            </tr>

          </thead>

          <tbody>

            {collections.map((item) => (

              <tr key={item.id}>

                <td>
                  {
                    item.loan
                      ?.customer_name
                  }
                </td>

                <td>
                  ₹{item.amount_paid}
                </td>

                <td>
                  {item.payment_mode}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentCollections;