import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import NotesPanel from "./components/NotesPanel";
import EmptyState from "./components/EmptyState";
import "./styles.css";

const App = () => {
  
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("notesAppData");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeGroupId, setActiveGroupId] = useState(null);

  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("notesAppData", JSON.stringify(groups));
  }, [groups]);

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  const handleBack = () => {
    setActiveGroupId(null);
  };

  return (
    <div className="app">
      
      {(!isMobile || !activeGroup) && (
        <Sidebar
          groups={groups}
          setGroups={setGroups}
          activeGroupId={activeGroupId}
          setActiveGroupId={setActiveGroupId}
        />
      )}

      
      <div className="notes-container">
        {activeGroup ? (
          <NotesPanel
            group={activeGroup}
            groups={groups}
            setGroups={setGroups}
            onBack={handleBack}
            isMobile={isMobile}
          />
        ) : (
          !isMobile && <EmptyState />
        )}
      </div>
    </div>
  );
};

export default App;

