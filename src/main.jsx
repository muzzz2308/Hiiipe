import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./admin/AuthContext.jsx";
import { ConfirmProvider } from "./components/ui/ConfirmDialog.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConfirmProvider>
          <App />
          <Toaster
            theme="dark"
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast:
                  "border border-[#31312f] bg-[#050402] text-[#f7f6f1] font-sans",
                title: "font-medium",
                description: "text-[#94948d]",
                actionButton: "bg-[#e8cb2f] text-[#111110]",
                cancelButton: "bg-[#21211f] text-[#f7f6f1]",
              },
            }}
          />
        </ConfirmProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
