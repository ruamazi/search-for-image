import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [ourData, setOurData] = useState("");
  const [paramos, setParamos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [seeFullText, setSeeFullText] = useState(false);

  const fetchData = async () => {
    const url = `https://free-images-api.p.rapidapi.com/images/${
      paramos || "wallpaper"
    }`;

    try {
      setIsLoading(true);
      const resp = await fetch(url, {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": "free-images-api.p.rapidapi.com",
        },
      });
      const data = await resp.json();
      setOurData(data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (e) => {
    setParamos(e.target.value);
  };
  const handleClick = () => {
    fetchData();
    setParamos("");
  };
  function truncateText(text) {
    const words = text.split(" ");
    if (words.length > 4) {
      const truncatedText = words.slice(0, 4).join(" ") + "...";
      return truncatedText;
    }
    return text;
  }

  return (
    <div className="app">
      <div className="top">
        <input
          placeholder="Search for somthing..."
          type="text"
          onChange={(e) => handleOnChange(e)}
        />
        <button onClick={handleClick}>Search</button>
      </div>

      <div className="content">
        {!isLoading && ourData ? (
          ourData?.map((item) => {
            return (
              <div key={item.id} className="container">
                <img src={item.diffrentSizes[3]} alt="image" />
                {item.download !== "" ? (
                  <a href={item.download}>
                    <button>download</button>
                  </a>
                ) : (
                  <div>
                    <button onClick={() => setSeeFullText((prev) => !prev)}>
                      {seeFullText
                        ? item.description
                        : truncateText(item.description)}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
