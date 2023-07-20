import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const container = document.getElementById("root");
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <App />
    </LocalizationProvider>
  );
}
