import { Toaster } from "sonner";
import AppRouter from "./Routes/AppRouter";
import Loader from "./Components/Common/Loader";

function App() {
  return (
    <Loader>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "bg-dark-surface border border-dark-border text-dark-text",
            title: "text-dark-text font-semibold",
            description: "text-dark-muted",
            success: "border-green-500/50 bg-dark-surface text-green-400",
            error: "border-red-500/50 bg-dark-surface text-red-400",
          },
        }}
      />
      <AppRouter />
    </Loader>
  );
}

export default App;
