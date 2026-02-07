const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-content">
        <h2>Pocket Notes</h2>
        <p>
          Send and receive messages without keeping your phone online.
          <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
      </div>

      <div className="encrypted">
        🔒 end-to-end encrypted
      </div>
    </div>
  );
};

export default EmptyState;
