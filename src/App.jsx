import "./App.scss";
import Layout from "./Layout/Layout.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Layout />
    </AuthContextProvider>
  );
}

export default App;
