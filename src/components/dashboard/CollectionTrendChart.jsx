import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,

} from "recharts";

function CollectionTrendChart({

  data,
}) {

  return (
    <div className="card shadow border-0">

      <div className="card-body">

        <h5 className="mb-4">
          Daily Collection Trend
        </h5>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default CollectionTrendChart;