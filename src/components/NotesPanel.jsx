import { useState, useRef, useEffect } from "react";

const NotesPanel = ({ group, groups, setGroups, onBack, isMobile }) => {
  const [text, setText] = useState("");
  const notesEndRef = useRef(null);

  const saveNote = () => {
    if (!text.trim()) return;

    const updatedGroups = groups.map((g) =>
      g.id === group.id
        ? {
            ...g,
            notes: [
              ...g.notes,
              {
                id: Date.now(),
                text,
                createdAt: new Date().toLocaleString()
              }
            ]
          }
        : g
    );

    setGroups(updatedGroups);
    setText("");
  };

  useEffect(() => {
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [group.notes]);

  return (
    <div className="notes-page">
      
      <div className="notes-header">
        
        {isMobile && (
          <button className="back-btn" onClick={onBack}>
            ←
          </button>
        )}

        <div className="avatar" style={{ backgroundColor: group.color }}>
          {group.name
            .split(" ")
            .map((w) => w[0].toUpperCase())
            .join("")}
        </div>
        <h3>{group.name}</h3>
      </div>

      
      <div className="notes-body">
        {group.notes.length === 0 ? (
          <div className="empty-notes-page">
            No notes yet. Start typing below!
          </div>
        ) : (
          group.notes.map((note) => (
            <div key={note.id} className="note-card">
              <p>{note.text}</p>
              <span className="note-time">{note.createdAt}</span>
            </div>
          ))
        )}
        <div ref={notesEndRef} />
      </div>

      
      <div className="notes-input">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              saveNote();
            }
          }}
          placeholder="Type your note..."
        />
        <button
          className={text.trim() ? "send active" : "send"}
          onClick={saveNote}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default NotesPanel;

