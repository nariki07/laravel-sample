import React, { useState } from "react";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");
    const [dueDate, setDueDate] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        setErrors({});

        const task = { title, description, status, due_date: dueDate };

        try {
            console.log('送信データ:', task);
            
            const response = await fetch("http://127.0.0.1:8000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(task)
            });

            console.log('レスポンスステータス:', response.status);
            const responseData = await response.json();
            console.log('レスポンスデータ:', responseData);

            if (!response.ok) {
                setErrors(responseData.errors || {});
                setMessage(responseData.message || "送信に失敗しました。");
            } else {
                setMessage(responseData.message || "タスクを作成しました！");
                setErrors({});
                // フォーム初期化
                setTitle("");
                setDescription("");
                setStatus("todo");
                setDueDate("");
            }
        } catch (err) {
            console.error("送信エラー:", err);
            setMessage("通信エラーが発生しました。");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            todo: "bg-blue-100 text-blue-800",
            in_progress: "bg-yellow-100 text-yellow-800",
            completed: "bg-green-100 text-green-800",
            on_hold: "bg-orange-100 text-orange-800",
            canceled: "bg-red-100 text-red-800"
        };
        return colors[status] || colors.todo;
    };

    return (
        <div className="bg-gradient-to-br from-white via-blue-50 via-purple-50 to-pink-50 bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 h-fit border-2 border-gradient-rainbow hover:shadow-rainbow transition-all duration-500 animate-border-rainbow w-full max-w-4xl mx-auto box-border overflow-hidden">
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-spin-slow shadow-lg">
                        <span className="text-3xl animate-bounce">🎯</span>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-text">新しいタスクを作成</h2>
                        <div className="h-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-blue-400 rounded-full mt-2 animate-rainbow-slide"></div>
                    </div>
                </div>
                <p className="text-gray-800 font-bold text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">🌈 タスクの詳細を入力して、夢の目標を達成しましょう！ ✨</p>
            </div>

            {message && (
                <div className={`mb-6 p-6 rounded-3xl backdrop-blur-sm border-3 ${
                    message.includes("成功") || message.includes("作成") || message.includes("正常")
                        ? "bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 border-green-400 text-green-900 shadow-green-300/50"
                        : "bg-gradient-to-r from-red-100 via-pink-100 to-orange-100 border-red-400 text-red-900 shadow-red-300/50"
                } shadow-2xl animate-message-glow`}>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl animate-bounce">{
                            message.includes("成功") || message.includes("作成") || message.includes("正常")
                                ? "🎉" : "⚠️"
                        }</span>
                        <p className="font-black text-lg">{message}</p>
                        <div className="ml-auto">
                            <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping animation-delay-200"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-400"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        タイトル <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className={`w-full max-w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors box-border ${
                            errors.title ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="タスクのタイトルを入力してください"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        説明 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        rows={4}
                        className={`w-full max-w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors resize-none box-border ${
                            errors.description ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="タスクの詳細説明を入力してください"
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            ステータス
                        </label>
                        <select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                            className="w-full max-w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-300 focus:border-purple-500 focus:outline-none transition-all duration-300 bg-gradient-to-r from-white to-purple-50 font-medium shadow-lg hover:shadow-xl hover:border-purple-300 box-border"
                        >
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on_hold">On Hold</option>
                            <option value="canceled">Canceled</option>
                        </select>
                        <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                                {status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        {errors.status && (
                            <p className="mt-1 text-sm text-red-600">{errors.status[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            期限 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                            required
                            className={`w-full max-w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors box-border ${
                                errors.due_date ? 'border-red-300' : 'border-gray-300'
                            }`}
                        />
                        {errors.due_date && (
                            <p className="mt-1 text-sm text-red-600">{errors.due_date[0]}</p>
                        )}
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${
                            isSubmitting 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                送信中...
                            </>
                        ) : (
                            'タスクを保存'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
