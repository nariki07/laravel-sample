import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskForm from './components/TaskForm';
import ActivityLog from './components/ActivityLog';

function App() {
    return (
        <div>
            <TaskForm />
            <ActivityLog />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
