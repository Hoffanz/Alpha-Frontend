import React, { createContext, useState, useEffect } from "react";
import ProjectCard from "../partials/components/ProjectsCard/ProjectCard";
import { apiFetch } from "../utils/api";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProject] = useState([]);

  const fetchProjectData = async () => {
    try {
      const data = await apiFetch("projects");
      setProject(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err.message);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, fetchProjectData }}>
      {children}
    </ProjectContext.Provider>
  );
};
