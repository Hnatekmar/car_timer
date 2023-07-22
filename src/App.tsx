import { useEffect, useState } from "react";

import { Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DriverCard from "./components/DriverCard";

import dayjs, { Dayjs } from "dayjs";
export class DefaultDriver {
  name = "";
  started = false;
  arrivalTime: Dayjs | null = null;
  serviceTime: Dayjs | null = null;
}

function App() {
  const [actualTime, setActualTime] = useState(dayjs());
  const [drivers, setDrivers] = useState([new DefaultDriver()]);
  const [newDriverHover, setNewDriverHover] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setActualTime(dayjs());
    }, 1000);
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
        <Typography variant="h1">
          {dayjs(actualTime).format("HH:mm:ss")}
        </Typography>
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
            key={i}
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
                if ((newDrivers[i].arrivalTime as Dayjs) < actualTime)
                  newDrivers[i].arrivalTime = (
                    newDrivers[i].arrivalTime as Dayjs
                  ).add(dayjs.duration(1, "days"));
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
