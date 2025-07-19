import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskForm from './components/TaskForm';
import ActivityLog from './components/ActivityLog';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">タスク管理システム</h1>
                    <p className="text-gray-600">効率的にタスクを管理しましょう</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* タスク作成フォーム - 左側2/3 */}
                    <div className="lg:col-span-2">
                        <TaskForm />
                    </div>
                    
                    {/* アクティビティ履歴 - 右側1/3 */}
                    <div className="lg:col-span-1">
                        <ActivityLog />
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
