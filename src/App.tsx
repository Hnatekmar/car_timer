import { useEffect, useState } from "react";

import { Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DriverCard from "./components/DriverCard";

export class DefaultDriver {
  name = "";
  started = false;
  arrivalTime = null;
  serviceTime = null;
}

function App() {
  const [actualTime, setActualTime] = useState(new Date());
  const [drivers, setDrivers] = useState([new DefaultDriver()]);
  const [newDriverHover, setNewDriverHover] = useState(false);

  useEffect(() => {
    setInterval(() => setActualTime(new Date()), 1000);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#E0E0E0",
      }}
    >
      <Paper
        style={{
          width: "100%",
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Typography variant="h1">{`${actualTime
          .getHours()
          .toString()
          .padStart(2, "0")}:${actualTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${actualTime
          .getSeconds()
          .toString()
          .padStart(2, "0")}`}</Typography>
      </Paper>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "auto",
          columnGap: 20,
          rowGap: 20,
          padding: 40,
        }}
      >
        {drivers.map((driver, i) => (
          <DriverCard
            actualTime={actualTime}
            driver={driver}
            setName={(newName) =>
              setDrivers((prev) => {
                const newDrivers = [...prev];
                newDrivers[i].name = newName;
                return newDrivers;
              })
            }
            handleStart={() => {
              setDrivers((prev) => {
                const newDrivers = [...prev];
                newDrivers[i].started = true;
                return newDrivers;
              });
            }}
            handleDelete={() => {
              setDrivers((prev) => {
                const newDrivers = [...prev];
                newDrivers.splice(i, 1);
                return newDrivers;
              });
            }}
            changeArrivalTime={(value, _) => {
              setDrivers((prev) => {
                const newDrivers = [...prev];
                newDrivers[i].arrivalTime = value;
                return newDrivers;
              });
            }}
            changeServiceTime={(value, _) => {
              setDrivers((prev) => {
                const newDrivers = [...prev];
                newDrivers[i].serviceTime = value;
                return newDrivers;
              });
            }}
          />
        ))}
        <Paper
          elevation={12}
          style={{
            height: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: newDriverHover ? "#F5F5F5" : undefined,
          }}
          onPointerEnter={() => setNewDriverHover((prev) => !prev)}
          onPointerLeave={() => setNewDriverHover((prev) => !prev)}
          onClick={() => setDrivers((prev) => [...prev, new DefaultDriver()])}
        >
          <Typography variant="h4">Nový jezdec</Typography>
          <AddIcon fontSize="large" />
        </Paper>
      </div>
    </div>
  );
}

export default App;
