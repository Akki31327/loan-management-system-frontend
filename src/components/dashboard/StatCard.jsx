function StatCard({

  title,

  value,

  icon,

  color,
}) {

  return (
    <div className="card shadow border-0">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <h6 className="text-muted">
              {title}
            </h6>

            <h3 className={`text-${color}`}>
              {value}
            </h3>

          </div>

          <div
            className={`fs-1 text-${color}`}
          >
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
}

export default StatCard;