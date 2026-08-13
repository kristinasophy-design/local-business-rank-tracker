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
            <p>Previous Rank: #{business.previousRank}</p>
          )}

          {business.lastChecked && (
            <p>Last Checked: {business.lastChecked}</p>
          )}
        </div>
      ) : (
        <p>Ranking has not been checked yet.</p>
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