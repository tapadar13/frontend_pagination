import { useState, useEffect } from "react";
import config from "./constants/config";
import "./App.css";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

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

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 6 - 6, page * 6).map((prod) => {
            return (
              <span className="products__list" key={prod?.id}>
                <img src={prod?.thumbnail} alt={prod?.title} />
                <span>{prod?.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span>◀️</span>
          {[...Array(products.length / 6)].map((_, idx) => {
            return (
              <span
                className={page === idx + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(idx + 1)}
                key={idx}
              >
                {idx + 1}
              </span>
            );
          })}
          <span>▶️</span>
        </div>
      )}
    </div>
  );
}

export default App;
