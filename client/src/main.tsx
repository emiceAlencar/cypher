import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SessionProvider } from "./contexts/SessionContext";
import { StatusProvider } from "./contexts/StatusContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(<ThemeProvider defaultTheme="light" switchable><SessionProvider><StatusProvider><App /></StatusProvider></SessionProvider></ThemeProvider>);
