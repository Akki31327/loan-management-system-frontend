import {

  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,

} from "recharts";

function PaymentModeChart({ data }) {

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
  ];

  return (
    <div className="card shadow border-0">

      <div className="card-body">

        <h5 className="mb-4">
          Collection by Payment Mode
        </h5>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="amount"
              nameKey="mode"
              outerRadius={100}
              label
            >

              {data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default PaymentModeChart;