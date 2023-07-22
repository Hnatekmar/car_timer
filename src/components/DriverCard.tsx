import { Button, Chip, Paper, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { DefaultDriver } from "../App";

import dayjs, { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function DriverCard({
  actualTime,
  driver,
  setName,
  changeArrivalTime,
  changeServiceTime,
  handleStart,
  handleDelete,
}: {
  actualTime: Dayjs;
  driver: DefaultDriver;
  setName: (newName: string) => void;
  changeArrivalTime: (value: Dayjs | null, context: any) => void;
  changeServiceTime: (value: Dayjs | null, context: any) => void;
  handleStart: () => void;
  handleDelete: () => void;
}) {
  const timeToStart =
    driver.arrivalTime !== null ? driver.arrivalTime.diff(actualTime) : null;
  const currentServiceTime =
    driver.serviceTime !== null && timeToStart !== null
      ? dayjs
          .duration({
            hours: driver.serviceTime.get("hour"),
            minutes: driver.serviceTime.get("minute"),
            seconds: driver.serviceTime.get("second"),
            milliseconds: driver.serviceTime.get("millisecond"),
          })
          .asMilliseconds() + timeToStart
      : null;

  let state = "";
  if (timeToStart !== null && currentServiceTime !== null)
    state =
      timeToStart > 0
        ? "notArrived"
        : currentServiceTime > 0
        ? "service"
        : "done";

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
              ? dayjs.utc(state === "notArrived" ? timeToStart : 0)
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
          value={
            driver.started
              ? dayjs.utc(
                  state === "service"
                    ? currentServiceTime
                    : state === "notArrived"
                    ? driver.serviceTime
                    : 0
                )
              : driver.serviceTime
          }
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
