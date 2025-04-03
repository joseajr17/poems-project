import { Header } from "./components/Header";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="flex flex-col items-center bg-white font-mono text-gray min-h-screen w-full ">
      <Header />
      <Home />
    </div>
  )
}

export default App
