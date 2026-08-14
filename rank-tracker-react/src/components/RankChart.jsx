function RankChart({ rankHistory }) {
  if (!rankHistory || rankHistory.length === 0) {
    return null;
  }

  const chartData = rankHistory.slice(-10);

  const ranks = chartData.map((entry) => entry.rank);

  const maxRank = Math.max(...ranks, 1);

  const chartHeight = 220;
  const chartWidth = 600;
  const padding = 40;

  const getX = (index) => {
    if (chartData.length === 1) {
      return chartWidth / 2;
    }

    return (
      padding +
      (index * (chartWidth - padding * 2)) /
        (chartData.length - 1)
    );
  };

  const getY = (rank) => {
    return (
      padding +
      ((rank - 1) * (chartHeight - padding * 2)) /
        Math.max(maxRank - 1, 1)
    );
  };

  const points = chartData
    .map((entry, index) => `${getX(index)},${getY(entry.rank)}`)
    .join(" ");

  return (
    <div className="rank-chart">
      <h4>Rank Trend</h4>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        width="100%"
        height="220"
        role="img"
        aria-label="Ranking trend chart"
      >
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={chartHeight - padding}
          stroke="currentColor"
          strokeOpacity="0.25"
        />

        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="currentColor"
          strokeOpacity="0.25"
        />

        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />

        {chartData.map((entry, index) => (
          <g key={`${entry.date}-${index}`}>
            <circle
              cx={getX(index)}
              cy={getY(entry.rank)}
              r="5"
              fill="currentColor"
            />

            <text
              x={getX(index)}
              y={getY(entry.rank) - 10}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
            >
              #{entry.rank}
            </text>
          </g>
        ))}
      </svg>

      <p className="chart-note">
        Showing the last {chartData.length} ranking checks.
      </p>
    </div>
  );
}

export default RankChart;