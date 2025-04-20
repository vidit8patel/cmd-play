-- Create the suspects table
CREATE TABLE suspects (
    suspect_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    occupation TEXT
);

-- Create the alibis table
CREATE TABLE alibis (
    alibi_id INTEGER PRIMARY KEY,
    suspect_id INTEGER,
    location TEXT NOT NULL,
    time TEXT NOT NULL,
    FOREIGN KEY (suspect_id) REFERENCES suspects(suspect_id)
);

-- Create the security_cameras table
CREATE TABLE security_cameras (
    camera_id INTEGER PRIMARY KEY,
    location TEXT NOT NULL,
    status TEXT
);

-- Create the camera_logs table
CREATE TABLE camera_logs (
    log_id INTEGER PRIMARY KEY,
    camera_id INTEGER,
    name TEXT,
    time TEXT,
    activity TEXT,
    FOREIGN KEY (camera_id) REFERENCES security_cameras(camera_id)
);

-- Insert sample suspects
INSERT INTO suspects (suspect_id, name, age, occupation) VALUES
(1, 'John Smith', 35, 'Banker'),
(2, 'Emily Davis', 28, 'Chef'),
(3, 'Michael Wong', 42, 'Security Guard'),
(4, 'Sarah Johnson', 31, 'Teacher'),
(5, 'Robert Brown', 45, 'Janitor');

-- Insert sample alibis
INSERT INTO alibis (alibi_id, suspect_id, location, time) VALUES
(1, 1, 'Downtown Cafe', '22:30'),
(2, 2, 'Restaurant Kitchen', '22:15'),
(3, 3, 'Security Office', '22:45'),
(4, 4, 'Library', '22:30'),
(5, 5, 'Warehouse', '22:30'),
(6, 1, 'Warehouse', '23:00'),
(7, 2, 'Warehouse', '23:15'),
(8, 3, 'Warehouse', '23:30');

-- Insert sample security cameras
INSERT INTO security_cameras (camera_id, location, status) VALUES
(1, 'Central Park North', 'Active'),
(2, 'Central Park South', 'Active'),
(3, 'City Park East', 'Inactive'),
(4, 'Warehouse Loading Bay', 'Active'),
(5, 'Downtown Cafe', 'Active');

-- Insert sample camera logs
INSERT INTO camera_logs (log_id, camera_id, name, time, activity) VALUES
(1, 1, 'Unknown Person', '22:15', 'Walking'),
(2, 2, 'John Smith', '22:45', 'Running'),
(3, 4, 'Emily Davis', '23:15', 'Entering'),
(4, 4, 'Michael Wong', '23:30', 'Entering'),
(5, 5, 'Sarah Johnson', '22:30', 'Sitting'),
(6, 4, 'Robert Brown', '23:00', 'Entering');
