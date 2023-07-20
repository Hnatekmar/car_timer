import { Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { DefaultDriver } from "../App";

function DriverCard({
  actualTime,
  driver,
  setName,
  changeArrivalTime,
  changeServiceTime,
  handleStart,
  handleDelete,
}: {
  actualTime: any;
  driver: DefaultDriver;
  setName: (newName: string) => void;
  changeArrivalTime: (value: any, context: any) => void;
  changeServiceTime: (value: any, context: any) => void;
  handleStart: () => void;
  handleDelete: () => void;
}) {
  const state = "done"; // "notArrived" | "service" | "done" vyplnit dle výpočtů času

  return (
    <Paper
      variant="outlined"
      style={{
        height: 100,
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: 5 }}>
        <TextField
          label="Jméno jezdce"
          value={driver.name}
          onChange={(e) => setName(e.target.value)}
        />
        <TimePicker
          readOnly={driver.started}
          ampm={false}
          label={driver.started ? "Zbývá do příjezdu" : "Čas příjezdu"}
          views={["hours", "minutes", "seconds"]}
          sx={{ width: 200 }}
          value={
            driver.started
              ? driver.arrivalTime - actualTime
              : driver.arrivalTime
          }
          onChange={changeArrivalTime}
        />

        <TimePicker
          readOnly={driver.started}
          ampm={false}
          label="Doba servisu"
          views={["hours", "minutes", "seconds"]}
          sx={{ width: 200 }}
          value={driver.serviceTime}
          onChange={changeServiceTime}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {driver.started ? (
          <Chip
            label={
              state === "notArrived"
                ? "Nedorazil"
                : state === "service"
                ? "Servis"
                : "Dokončeno"
            }
            color={
              state === "notArrived"
                ? "info"
                : state === "service"
                ? "warning"
                : "success"
            }
            variant="contained"
          />
        ) : (
          <Button
            disabled={
              driver.name === "" ||
              driver.arrivalTime === null ||
              driver.serviceTime === null
            }
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={handleStart}
          >
            Potvrdit
          </Button>
        )}
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Smazat
        </Button>
      </div>
    </Paper>
  );
}

export default DriverCard;
