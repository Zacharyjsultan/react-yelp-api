import { useEffect, useState } from 'react';
import './App.css';
import { RestaurantListItem } from './components/RestaurantListItem';
import { fetchBusinesses } from './services/yelp';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [zip, setZip] = useState('97202');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBusinesses();
      setBusinesses(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleApi = async () => {
    const data = await fetchBusinesses(search, zip);
    setBusinesses(data);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Alchemy Restaurant Finder</h1>
      <div className="query-form">
        <div className="form-control">
          <label>Zip:</label>
          <input
            value={zip}
            type="text"
            placeholder="zip"
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
        </div>
        <div className="form-control">
          <label>Query:</label>
          <input
            value={search}
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <button onClick={handleApi}>Search</button>
      </div>
      {loading && <div className="loader"></div>}
      {!loading && businesses.map((b) => <RestaurantListItem key={b.id} {...b} />)}
    </div>
  );
}

export default App;
