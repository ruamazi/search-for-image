import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  const [ourData, setOurData] = useState("");
  const [paramos, setParamos] = useState("");

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: `https://free-images-api.p.rapidapi.com/images/${paramos}`,
      headers: {
        "X-RapidAPI-Key": "ab9cefa600msh83963bcbb17c559p126fecjsn13fe0f01fb7d",
        "X-RapidAPI-Host": "free-images-api.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const { results } = response.data;
      setOurData(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e) => {
    setParamos(e.target.value);
  };
  const handleClick = () => {
    fetchData();
    setParamos("");
  };
  console.log(paramos);
  return (
    <div className="app">
      <div className="top">
        <input type="text" onChange={(e) => handleOnChange(e)} />
        <button onClick={handleClick}>Get data</button>
      </div>
      <div className="content">
        {ourData ? (
          ourData?.map((item) => {
            return (
              <div key={item.id} className="container">
                <img src={item.diffrentSizes[3]} alt="image" />
                <a href={item.download}>
                  <button>download</button>
                </a>
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
