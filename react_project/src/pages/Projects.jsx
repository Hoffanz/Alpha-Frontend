import React, { useState, useContext } from "react";
import ModalButton from "../partials/components/ModalButton";
import { ProjectProvider, ProjectContext } from "../contexts/ProjectProvider";
import ProjectModal from "../partials/components/Modal/EditModal/ProjectModal";
import ProjectCard from "../partials/components/ProjectsCard/ProjectCard";
import { apiFetch } from "../utils/api";

const Projects = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const { projects, fetchProjectData } = useContext(ProjectContext);

  const allCount = projects.length;
  const completedCount = projects.filter(
    (p) => p.status?.statusName?.toUpperCase() === "COMPLETED"
  ).length;

  const filteredProjects =
    activeTab === "completed"
      ? projects.filter(
          (p) => p.status?.statusName?.toUpperCase() === "COMPLETED"
        )
      : [...projects].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );

  const handleEdit = (project) => {
    setSelectedProject(project);
    setModalMode("edit");
    setModalIsOpen(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setModalMode("add");
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = async (projectId) => {
    try {
      await apiFetch(`projects/${projectId}`, {
        method: "DELETE",
      });

      fetchProjectData();
    } catch (err) {
      console.error("Error deleting project:", err.message);
    }
  };

  const handleSave = async (updatePayload) => {
    try {
      await apiFetch("projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });

      fetchProjectData();
      setModalIsOpen(false);
    } catch (err) {
      console.error("Error updating project:", err.message);
    }
  };

  const handleCreate = async (payload) => {
    try {
      await apiFetch("projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      fetchProjectData();
      setModalIsOpen(false);
    } catch (err) {
      console.error("Error creating project:", err.message);
    }
  };

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <button className="btn btn-add" onClick={handleAdd}>
          Add Project
        </button>
      </div>

      <div className="tab-row">
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          ALL [{allCount}]
        </button>
        <button
          className={`tab ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          COMPLETED [{completedCount}]
        </button>
      </div>

      <div className="projects-grid">
        {filteredProjects?.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onEdit={() => handleEdit(p)}
            onDelete={() => handleDelete(p.id)}
          />
        ))}
      </div>

      <ProjectModal
        mode={modalMode}
        show={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        onAdd={handleCreate}
        projectData={selectedProject}
      />
    </div>
  );
};

export default Projects;
