import { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "./context/themeManager";
import Routing from "./Routing";
//components



function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = `background_${theme}`
  }, [theme])

  return (
    <>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routing />
      </Suspense>
      <ToastContainer
        position=" "
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
