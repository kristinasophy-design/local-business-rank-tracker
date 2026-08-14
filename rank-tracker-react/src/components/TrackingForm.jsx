function TrackingForm({
  businessName,
  keyword,
  location,
  setBusinessName,
  setKeyword,
  setLocation,
  handleTracking,
  editingId,
}) {
  return (
    <form onSubmit={handleTracking}>
      <h2>{editingId !== null ? "Edit Business" : "Add Business to Track"}</h2>

      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(event) => setBusinessName(event.target.value)}
      />

      <input
        type="text"
        placeholder="Keyword"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <div>
  <label>Location</label>
  <br />

  <input
    type="text"
    value={location}
    onChange={(event) => setLocation(event.target.value)}
    placeholder="e.g. Mombasa"
  />
</div>

<br />

      <button type="submit">
        {editingId !== null ? "Update Business" : "Start Tracking"}
      </button>
    </form>
  );
}

export default TrackingForm;