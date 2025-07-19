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
        <div className="bg-white rounded-lg shadow-xl p-8 h-fit">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">新しいタスク</h2>
                <p className="text-gray-600">タスクの詳細を入力してください</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                    message.includes("成功") || message.includes("作成") || message.includes("正常")
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                }`}>
                    <p className="text-sm font-medium">{message}</p>
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
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
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
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
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
