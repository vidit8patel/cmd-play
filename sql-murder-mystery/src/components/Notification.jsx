import React from 'react';
import './Notification.css';

const Notification = ({ message, onClose, type = 'success', duration = 2500 }) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <div className={`notification-popup ${type}`}>
      <span>{message}</span>
      <button className="notification-close" onClick={onClose} aria-label="Close notification">&times;</button>
    </div>
  );
};

export default Notification;
