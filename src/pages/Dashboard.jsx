import Navbar from "../components/Navbar";

import StatCard from "../components/dashboard/StatCard";

import PaymentModeChart from "../components/dashboard/PaymentModeChart";

import CollectionTrendChart from "../components/dashboard/CollectionTrendChart";

import RecentCollections from "../components/dashboard/RecentCollections";

import useFetch from "../hooks/useFetch";

function Dashboard() {


  // FETCH DASHBOARD DATA


  const { data, loading } =
    useFetch("/dashboard/summary");

  const dashboard =
    data?.data || {};


  // CHART DATA


  const paymentModeData = [

  {
    mode: "Cash",
    amount: Number(
      dashboard.cash_collection
    ) || 0,
  },

  {
    mode: "UPI",
    amount: Number(
      dashboard.upi_collection
    ) || 0,
  },

  {
    mode: "Card",
    amount: Number(
      dashboard.card_collection
    ) || 0,
  },
];
  const trendData =
    dashboard.collection_trends || [];

  const recentCollections =
    dashboard.recent_collections || [];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">
  
            {/* Left Side */}
            <h2 className="m-0">Dashboard Analytics</h2>

            {/* Right Side */}
            <div style={{ width: "300px" }}>
                <StatCard
                title="Best Collection Time"
                value={dashboard.best_collection_time}
                icon="⏰"
                color="info"
                />
            </div>

        </div>

        {/* STATS */}

        <div className="row g-4 mb-4">

          <div className="col-md-3">

            <StatCard
              title="Total Loans"
              value={
                dashboard.total_loans || 0
              }
              icon="📄"
              color="primary"
            />

          </div>

          <div className="col-md-3">

            <StatCard
              title="Total Collection"
              value={`₹ ${
                dashboard.total_collection || 0
              }`}
              icon="💰"
              color="success"
            />

          </div>

          <div className="col-md-3">

            <StatCard
              title="Pending Amount"
              value={`₹ ${
                dashboard.total_pending_amount || 0
              }`}
              icon="⏳"
              color="danger"
            />

          </div>

          <div className="col-md-3">

            <StatCard
              title="Collected Today"
              value={`₹ ${
                dashboard.total_collected_today || 0
              }`}
              icon="📈"
              color="warning"
            />

          </div>

        </div>

        {/* CHARTS */}

        <div className="row g-4 mb-4">

          <div className="col-md-6">

            <PaymentModeChart
              data={paymentModeData}
            />

          </div>

          <div className="col-md-6">

            <CollectionTrendChart
              data={trendData}
            />

          </div>

        </div>

        {/* RECENT COLLECTIONS */}

        <div className="row">

          <div className="col-md-12">

            <RecentCollections
              collections={
                recentCollections
              }
            />

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;