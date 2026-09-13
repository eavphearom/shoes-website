import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/common/SplashScreen";

function App() {
  const location = useLocation();
  const showHomeSplash = location.pathname === "/";

  // return (
  //   <div className="p-10">
  //     <h1 className="text-3xl font-bold">
  //       React Starter
  //     </h1>

  //     <button className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white">
  //       Test Tailwind
  //     </button>
  //   </div>
  // );
  return (
    <>
      <SplashScreen enabled={showHomeSplash} />
      <AppRoutes />
    </>
  );
}

export default App;
