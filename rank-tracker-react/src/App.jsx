import { useEffect, useState } from "react";
import TrackingForm from "./components/TrackingForm";
import BusinessCard from "./components/BusinessCard";

function App() {
  const [businessName, setBusinessName] = useState("");
  const [keyword, setKeyword] = useState("");
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
    setEditingId(business.id);
  }

  function handleTracking(event) {
    event.preventDefault();

    if (!businessName || !keyword) {
      alert("Please enter both the business name and keyword.");
      return;
    }

    if (editingId !== null) {
      const updatedBusinesses = businesses.map((business) =>
        business.id === editingId
          ? {
              ...business,
              name: businessName,
              keyword: keyword,
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
       currentRank: null,
       previousRank: null,
       lastChecked: null,
      };

      setBusinesses([...businesses, newBusiness]);
    }

    setBusinessName("");
    setKeyword("");
  }

  function handleCheckRanking(id) {
  const demoRank = Math.floor(Math.random() * 20) + 1;

  const updatedBusinesses = businesses.map((business) => {
    if (business.id === id) {
      return {
        ...business,
        previousRank: business.currentRank,
        currentRank: demoRank,
        lastChecked: new Date().toLocaleString(),
      };
    }

    return business;
  });

  setBusinesses(updatedBusinesses);
}

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
        setBusinessName={setBusinessName}
        setKeyword={setKeyword}
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
      <strong>{businesses.length}</strong>
      <span>Businesses</span>
    </div>

    <div className="stat-card">
      <strong>{businesses.length}</strong>
      <span>Keywords</span>
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