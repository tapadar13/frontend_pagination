import { useState, useEffect } from "react";
import config from "./constants/config";
import "./App.css";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(config.apiEndpoint);
      setLoading(false);
      setProducts(response.data.products);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return <div className="App"></div>;
}

export default App;
