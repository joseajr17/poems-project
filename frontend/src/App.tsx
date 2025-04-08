import { AuthProvider } from "./context/authContext";
import { AppRouter } from "./routes";

function App() {
  return (
    <div className="flex flex-col items-center bg-white font-mono text-gray min-h-screen w-full ">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
