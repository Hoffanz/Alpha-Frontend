import React, { useState, useEffect, useRef } from "react";
import logoPicture from "../../../assets/images/Vector 6.svg";
import iconPicture from "../../../assets/images/Options.svg";
import editPicture from "../../../assets/images/Edit.svg";
import deletePicture from "../../../assets/images/Delete.svg";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className="project-cards">
      <div className="project-cards-header">
        <div className="card-image">
          <img src={logoPicture} alt="logotype picture" />
        </div>

        <div className="project-cards-text-content">
          <h6 className="title">{project.projectName}</h6>
          <p className="company-name">{project.client.clientName}</p>
        </div>

        <div className="options-wrapper" ref={dropdownRef}>
          <img
            src={iconPicture}
            alt="options"
            className="options-icon"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ cursor: "pointer", width: "24px", height: "24px" }}
          />

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => onEdit(project)}>
                <img src={editPicture} alt="Edit" />
                <div className="edit-text">Edit</div>
              </div>
              <div className="dropdown-item delete" onClick={onDelete}>
                <img src={deletePicture} alt="Delete" />
                <div className="delete-text">Delete Project</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="project-cards-assignment-description">
        {project.description}
      </p>
    </div>
  );
};

export default ProjectCard;
