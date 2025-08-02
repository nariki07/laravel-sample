import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskForm from './components/TaskForm';
import ActivityLog from './components/ActivityLog';

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 via-fuchsia-500 via-pink-500 via-rose-500 via-red-500 via-orange-500 via-amber-500 via-yellow-500 via-lime-500 via-green-500 via-emerald-500 via-teal-500 via-cyan-500 via-sky-500 via-blue-500 via-indigo-500 to-violet-600 relative overflow-hidden animate-gradient-bg px-8 lg:px-16 xl:px-32 2xl:px-48">
            {/* レインボー背景要素 */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 bg-opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animate-rainbow-slow"></div>
                <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 bg-opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000 animate-rainbow-medium"></div>
                <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-pink-400 to-purple-500 bg-opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000 animate-rainbow-fast"></div>
                <div className="absolute bottom-20 right-32 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-500 bg-opacity-20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-6000"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-8000"></div>
            </div>

            <div className="relative z-10 flex justify-center min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-yellow-200 via-pink-200 via-purple-200 via-blue-200 via-green-200 to-white bg-clip-text text-transparent mb-6 drop-shadow-2xl animate-rainbow-text animate-bounce-slow">
                                🌈 タスク管理システム 🌈
                            </h1>
                            <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 rounded-full animate-rainbow-border shadow-lg"></div>
                        </div>
                        <div className="mt-8">
                            <p className="text-white text-lg md:text-xl lg:text-2xl font-bold drop-shadow-xl bg-gradient-to-r from-yellow-300 via-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent animate-color-shift">
                                🚀 効率的にタスクを管理して、夢を実現しましょう！ 🌟
                            </p>
                            <div className="flex justify-center mt-4 space-x-2">
                                <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce animation-delay-200"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce animation-delay-400"></div>
                                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce animation-delay-600"></div>
                                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-800"></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 mx-auto">
                        {/* サービス名と説明 */}
                        <div className="text-center mb-8 px-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-white/20">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg animate-rainbow-text">
                                    🌈 RainbowTask ✨
                                </h2>
                                <p className="text-xl md:text-2xl font-bold text-gray-800 animate-color-shift">
                                    あなたの夢を叶える、キラキラタスク管理システム 💫
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <div className="h-1 w-32 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full animate-rainbow-border"></div>
                                </div>
                            </div>
                        </div>

                        {/* タスク作成フォーム */}
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <TaskForm />
                        </div>

                        {/* アクティビティ履歴 */}
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <ActivityLog />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
