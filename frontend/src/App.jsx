import { Toaster } from "sonner";
import AppRouter from "./Routes/AppRouter";
import Loader from "./Components/Common/Loader";
import ScrollToHash from "./Components/Common/ScrollToHash";
import { BrowserRouter } from "react-router-dom";
import {  AuthProvider } from "@/Context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Loader>
        <ScrollToHash />

        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: "bg-dark-surface! border-dark-border! text-dark-text!",
              title: "text-black! ",
              description: "text-black!",
              success: "bg-light-surface! border-green-500! text-green-400!",
              error: "bg-light-surface!  border-red-500!  text-red-400!",
            },
          }}
        />
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </Loader>
    </BrowserRouter>
  );
}

export default App;
