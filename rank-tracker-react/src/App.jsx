import { useEffect, useState } from "react";
import TrackingForm from "./components/TrackingForm";
import BusinessCard from "./components/BusinessCard";

function App() {
  const [businessName, setBusinessName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [businesses, setBusinesses] = useState(() => {
    const savedBusinesses = localStorage.getItem("businesses");

    return savedBusinesses ? JSON.parse(savedBusinesses) : [];
  });

  useEffect(() => {
    localStorage.setItem("businesses", JSON.stringify(businesses));
  }, [businesses]);

  function handleDelete(id) {
    const updatedBusinesses = businesses.filter(
      (business) => business.id !== id
    );

    setBusinesses(updatedBusinesses);
  }

  function handleEdit(business) {
  setBusinessName(business.name);
  setKeyword(business.keyword);
  setLocation(business.location || "");
  setEditingId(business.id);
}

  function handleTracking(event) {
    event.preventDefault();

    if (!businessName || !keyword || !location) {
  alert("Please enter the business name, keyword, and location.");
  return;
}

    if (editingId !== null) {
      const updatedBusinesses = businesses.map((business) =>
        business.id === editingId
          ? {
              ...business,
              name: businessName,
              keyword: keyword,
              location: location,
            }
          : business
      );

      setBusinesses(updatedBusinesses);
      setEditingId(null);
    } else {
      const newBusiness = {
  id: Date.now(),
  name: businessName,
  keyword: keyword,
  location: location,
  currentRank: null,
  previousRank: null,
  lastChecked: null,
  rankHistory: [],
};

      setBusinesses([...businesses, newBusiness]);
    }

    setBusinessName("");
    setKeyword("");
    setLocation("");
  }

  function handleCheckRanking(id) {
  const demoRank = Math.floor(Math.random() * 20) + 1;
  const checkedAt = new Date().toLocaleString();

  const updatedBusinesses = businesses.map((business) => {
    if (business.id === id) {
      const history = business.rankHistory || [];

      const newHistoryEntry = {
        rank: demoRank,
        date: checkedAt,
      };

      return {
        ...business,
        previousRank: business.currentRank,
        currentRank: demoRank,
        lastChecked: checkedAt,
        rankHistory: [...history, newHistoryEntry],
      };
    }

    return business;
  });

  setBusinesses(updatedBusinesses);
}

const totalBusinesses = businesses.length;

const improvedCount = businesses.filter(
  (business) =>
    business.currentRank !== null &&
    business.previousRank !== null &&
    business.currentRank < business.previousRank
).length;
const droppedCount = businesses.filter(
  (business) =>
    business.currentRank !== null &&
    business.previousRank !== null &&
    business.currentRank > business.previousRank
).length;

const noChangeCount = businesses.filter(
  (business) =>
    business.currentRank !== null &&
    business.previousRank !== null &&
    business.currentRank === business.previousRank
).length;

const notCheckedCount = businesses.filter(
  (business) => business.currentRank === null
).length;

const totalKeywords = businesses.length;

  return (
    <div>
      <h1>Local Business Rank Tracker</h1>

      <p>
        Track your local searches and find out how your business performs
        for important Google searches.
      </p>

      <TrackingForm
        businessName={businessName}
        keyword={keyword}
        location={location}
        setBusinessName={setBusinessName}
        setKeyword={setKeyword}
        setLocation={setLocation}
        handleTracking={handleTracking}
        editingId={editingId}
/>

      <hr />

      <div className="dashboard-header">
  <div>
    <h2>Tracking Dashboard</h2>
    <p>Monitor your local search visibility.</p>
  </div>

  <div className="stats">
  <div className="stat-card">
    <strong>{totalBusinesses}</strong>
    <span>Businesses</span>
  </div>

  <div className="stat-card">
    <strong>{totalKeywords}</strong>
    <span>Keywords</span>
  </div>

  <div className="stat-card">
    <strong>{improvedCount}</strong>
    <span>Improved</span>
  </div>

  <div className="stat-card">
    <strong>{droppedCount}</strong>
    <span>Dropped</span>
  </div>

  <div className="stat-card">
    <strong>{noChangeCount}</strong>
    <span>No Change</span>
  </div>

  <div className="stat-card">
    <strong>{notCheckedCount}</strong>
    <span>Not Checked</span>
  </div>
</div>
</div>

      {businesses.length === 0 ? (
        <p>Your tracked businesses will appear here.</p>
      ) : (
        <div className="business-grid">
          {businesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCheckRanking={handleCheckRanking}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;