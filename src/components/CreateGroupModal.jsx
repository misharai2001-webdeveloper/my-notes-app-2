import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#FF6B6B",
  "#6BCB77",
  "#4D96FF",
  "#FFC75F",
  "#845EC2",
  "#00C9A7"
];

const CreateGroupModal = ({
  onClose,
  groups,
  setGroups,
  setActiveGroupId
}) => {
  const modalRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCreateGroup = () => {
    const trimmedName = groupName.trim();
    if (!trimmedName) return;

    const isDuplicate = groups.some(
      (g) => g.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      alert("Group already exists");
      return;
    }

    const newGroup = {
      id: Date.now(),
      name: trimmedName,
      color: selectedColor,
      notes: []
    };

    
    setGroups((prev) => [...prev, newGroup]);

    
    setActiveGroupId(newGroup.id);

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <h3>Create New Group</h3>

        <label>Group Name</label>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateGroup();
            }
          }}
        />

        <label>Choose Color</label>
        <div className="color-picker">
          {COLORS.map((color) => (
            <div
              key={color}
              className={`color-circle ${
                selectedColor === color ? "active" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>

        <button
          className={`createbtn ${
            groupName.trim() ? "active" : ""
          }`}
          onClick={handleCreateGroup}
          disabled={!groupName.trim()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModal;
