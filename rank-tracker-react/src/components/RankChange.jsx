function RankChange({ currentRank, previousRank }) {
  if (currentRank === null || previousRank === null) {
    return null;
  }

  const change = previousRank - currentRank;

  if (change > 0) {
    return <p>↑ Improved by {change} positions</p>;
  }

  if (change < 0) {
    return <p>↓ Dropped by {Math.abs(change)} positions</p>;
  }

  return <p>→ No change</p>;
}

export default RankChange;