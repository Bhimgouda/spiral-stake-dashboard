import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import type { Metrics } from "./types";

function App() {
  const [leveragePositions, setLeveragePositions] = useState([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newUser = async () => {
      const newUser = await axios.post("http://localhost:5000/user", {
        address: "0x34343434",
      });
      console.log(newUser.data);
    };
    const openLP = async () => {
      const openLeveragePoition = await axios.post(
        "http://localhost:5000/leverage/open",
        {
          id: "2323",
          collateralToken: "abdt",
          loanToken: "lodt",
          amountCollateral: 200,
          open: true,
        }
      );
      console.log(openLeveragePoition.data);
    };
    const closeLP = async () => {
      const closeLeveragePoition = await axios.put(
        "http://localhost:5000/leverage/close",
        {
          id: "2323",
        }
      );
      console.log(closeLeveragePoition.data);
    };
    // closeLP();
    openLP();
    newUser();
    fetchLeveragePositions();
    fetchMetrics();
  }, []);

  const fetchLeveragePositions = async () => {
    setLoading(true);
    const leveragePositions = await axios.get(
      "http://localhost:5000/leveragePositions"
    );
    setLeveragePositions(leveragePositions.data);
    setLoading(false);
  };

  const fetchMetrics = async () => {
    setLoading(true);
    const metrics = await axios.get("http://localhost:5000/metrics");
    setMetrics(metrics.data);
    setLoading(false);
  };

  return <>{!loading && <Dashboard leveragePositions={leveragePositions} metrics={metrics}/>}</>;
}

export default App;
