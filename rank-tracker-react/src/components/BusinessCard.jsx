import RankChange from "./RankChange";
function BusinessCard({
  business,
  onEdit,
  onDelete,
  onCheckRanking,
}) {
  return (
    <div>
      <h3>{business.name}</h3>

      <p>{business.keyword}</p>

      {business.currentRank !== null ? (
  <div>
    <strong>Current Rank: #{business.currentRank}</strong>

    {business.previousRank !== null && (
      <>
        <p>Previous Rank: #{business.previousRank}</p>

        <RankChange
          currentRank={business.currentRank}
          previousRank={business.previousRank}
        />
      </>
    )}

    {business.lastChecked && (
      <p>Last Checked: {business.lastChecked}</p>
    )}
  </div>
) : (
  <p>Ranking has not been checked yet.</p>
)}

{business.rankHistory && business.rankHistory.length > 0 && (
  <div className="rank-history">
    <h4>Rank History</h4>

    <ul>
      {business.rankHistory
        .slice()
        .reverse()
        .map((entry, index) => (
          <li key={index}>
            #{entry.rank} — {entry.date}
          </li>
        ))}
    </ul>
  </div>
)}

      <button onClick={() => onEdit(business)}>
        Edit
      </button>

      <button onClick={() => onDelete(business.id)}>
        Delete
      </button>

      <button onClick={() => onCheckRanking(business.id)}>
        Check Ranking
      </button>
    </div>
  );
}

export default BusinessCard;