import { useEffect } from "react";

import "./App.css";
import axios from "axios";
import Dashboard from "./components/Dashboard";

function App() {
  useEffect(() => {
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
    // openLP();
  }, []);

  return (
    <>
      <Dashboard/>
    </>
  );
}

export default App;
