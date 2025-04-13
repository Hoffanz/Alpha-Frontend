import "./assets/css/style.css";
import "./assets/css/animate.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routesConfig from "./routing/RoutesConfig";
import Providers from "./Providers";
import { ProjectProvider } from "./contexts/ProjectProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </BrowserRouter>
  </StrictMode>
);
/*Mycket av react är byggt med hjälp av AI, då jag inte har någon tidigare erfarenhet av React komponenter. I Frontend 2 så var React ett VG krav och inte ett G krav.*/
function App() {
  const routing = useRoutes(routesConfig);

  return <Providers>{routing}</Providers>;
}

export default App;
