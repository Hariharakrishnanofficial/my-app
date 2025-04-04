import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://backend-software-s6n8.onrender.com/get-data-siva"; // Replace with your ESP32 API URL

function App() {
  const [temperature, setTemperature] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.temperature !== undefined) {
          setTemperature(data.temperature);
          setHumidity(data.humidity);
          setMessage("");  
        } else {
          setMessage("No data found");
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setMessage("Error fetching data");
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container">
      <h1>Real-Time Sensor Dashboard</h1>
      <div className="sensor-container">
        <Sensor name="Temperature" value={temperature} unit="°C" />
        <Sensor name="Humidity" value={humidity} unit="%" />
      </div>
      {message && <h1 className="error">{message}</h1>}
    </div>
  );
}

const Sensor = ({ name, value, unit }) => (
  <div className="sensor">
    <h2>{name}</h2>
    <p>{value}</p>
    <span>{unit}</span>
  </div>
);

export default App;
