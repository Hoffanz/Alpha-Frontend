import React, { useEffect, useState } from "react";
import closeButton from "../../../../assets/images/X.svg";
import projectPicture from "../../../../assets/images/Img Select.svg";
import { apiFetch } from "../../../../utils/api";

const ProjectModal = ({
  mode = "add",
  projectData = {},
  show,
  onClose,
  onSave,
  onAdd,
}) => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [form, setForm] = useState({
    name: "",
    clientId: "",
    description: "",
    startDate: "",
    endDate: "",
    ownerId: "",
    budget: "",
    statusId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await apiFetch("clients");
        setClients(clientsData);

        const usersData = await apiFetch("users");
        setUsers(usersData);

        const statusesData = await apiFetch("status");
        setStatuses(statusesData);
      } catch (err) {
        console.error("❌ Misslyckades hämta data i modal:", err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (mode === "edit" && projectData) {
      setForm({
        name: projectData.projectName || "",
        clientId: projectData.clientId?.toString() || "",
        description: projectData.description || "",
        startDate: projectData.startDate?.split("T")[0] || "",
        endDate: projectData.endDate?.split("T")[0] || "",
        ownerId: projectData.userId?.toString() || "",
        budget: projectData.budget || "",
        statusId: projectData.statusId?.toString() || "",
      });
    }
  }, [mode, projectData, users, clients, statuses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (mode === "add") {
      const payload = {
        projectName: form.name,
        clientId: form.clientId,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        userId: form.ownerId,
        budget: Number(form.budget),
        statusId: form.statusId ? Number(form.statusId) : 1,
      };
      onAdd(payload);
    } else {
      const updatePayload = {
        id: projectData.id,
        projectName: form.name,
        clientId: form.clientId,
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        userId: form.ownerId,
        budget: Number(form.budget),
        statusId: Number(form.statusId),
      };
      console.log(updatePayload);
      onSave(updatePayload);
    }
  };

  if (!show) return null;

  console.log("form.ownerId:", form.ownerId);
  console.log(
    "user options:",
    users.map((u) => u.id)
  );
  console.log(mode);
  return (
    <form className="modal-overlay" onClick={onClose} onSubmit={handleSubmit}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        {/* Stängningsknapp */}
        <img
          src={closeButton}
          className="close-button"
          alt="close"
          onClick={onClose}
        />

        {/* Titel och ikon */}
        <div className="modal-heading">
          <h3 className="edit-title">
            {mode === "edit" ? "Edit Project" : "Add Project"}
          </h3>
          <div className="icon-wrapper">
            <img src={projectPicture} className="project-icon" alt="project" />
          </div>
        </div>

        {/* Formulär */}
        <div className="modal-body">
          <div className="form-group-container">
            <label className="label-text">Project Name</label>
            <input
              name="name"
              type="text"
              className="form-text"
              placeholder="Enter Project Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-container">
            <label className="label-text">Client Name</label>
            <select
              className="form-text"
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
              required
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id?.toString()}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group-container">
            <label className="label-text">Description</label>
            <input
              name="description"
              type="text"
              className="form-text-description"
              placeholder="Enter Project Description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Datum-fält på samma rad */}
          <div className="form-group-container-date">
            <div className="form-group-container">
              <label className="label-text">Start Date</label>
              <input
                name="startDate"
                type="date"
                className="date-input"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-container">
              <label className="label-text">End Date</label>
              <input
                name="endDate"
                type="date"
                className="date-input"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group-container">
            <label className="label-text">Project Owner</label>
            <select
              name="ownerId"
              className="form-select-prodowner"
              value={form.ownerId}
              onChange={handleChange}
              required
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group-container">
            <label className="label-text">Budget</label>
            <input
              name="budget"
              type="number"
              className="form-text-budget"
              placeholder="0"
              value={form.budget}
              onChange={handleChange}
              required
            />
          </div>

          {mode === "edit" && (
            <div className="form-group-container">
              <label className="label-text">Project Status</label>
              <select
                name="statusId"
                className="form-select-status"
                value={form.statusId}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id?.toString()}>
                    {status.statusName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button className="edit-save" type="submit">
            {mode === "edit" ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProjectModal;
