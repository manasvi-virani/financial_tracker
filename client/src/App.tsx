import "./App.css";
import Layout from "./component/layout/Layout";
import AppRouter from "./routes/router";

function App() {
  return (
    <div className="App">
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
}

export default App;
