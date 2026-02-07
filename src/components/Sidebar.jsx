import { useState } from "react";
import CreateGroupModal from "./CreateGroupModal";

const Sidebar = ({
  groups,
  setGroups,
  activeGroupId,
  setActiveGroupId
}) => {
  const [showModal, setShowModal] = useState(false);

  const getGroupInitials = (name) =>
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map(w => w[0].toUpperCase())
      .join("");

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Pocket Notes</h2>

      <div className="group-list">
        {groups.map(group => (
          <div
            key={group.id}
            className={`group-item ${
              activeGroupId === group.id ? "active" : ""
            }`}
            onClick={() => setActiveGroupId(group.id)}
          >
            <div
              className="avatar"
              style={{ backgroundColor: group.color }}
            >
              {getGroupInitials(group.name)}
            </div>

            <span className="group-name">{group.name}</span>
          </div>
        ))}
      </div>

      <button
        className="add-group-btn"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
          groups={groups}
          setGroups={setGroups}
          setActiveGroupId={setActiveGroupId}
        />
      )}
    </div>
  );
};

export default Sidebar;
