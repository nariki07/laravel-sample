import { useEffect, useState } from "react";

const dummyLogs = [
    {
        id: 1,
        task_id: 101,
        action: "created",
        description: "タスク 'レポート作成' を作成",
        created_at: "2025-06-21 09:15:00",
    },
    {
        id: 2,
        task_id: 101,
        action: "updated",
        description: "タスク 'レポート作成' の期限を変更",
        created_at: "2025-06-21 10:20:00",
    },
];

export default function ActivityLog() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        setLogs(dummyLogs);
    }, []);

    const getActionIcon = (action) => {
        const icons = {
            created: (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            ),
            updated: (
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            deleted: (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )
        };
        return icons[action] || icons.updated;
    };

    const getActionColor = (action) => {
        const colors = {
            created: "bg-gradient-to-r from-emerald-200 via-green-300 to-teal-200 text-green-900 shadow-lg border border-green-400",
            updated: "bg-gradient-to-r from-sky-200 via-blue-300 to-indigo-200 text-blue-900 shadow-lg border border-blue-400",
            deleted: "bg-gradient-to-r from-rose-200 via-red-300 to-pink-200 text-red-900 shadow-lg border border-red-400"
        };
        return colors[action] || colors.updated;
    };

    return (
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 h-fit border border-white border-opacity-30 hover:shadow-purple-500/25 transition-all duration-500 w-full max-w-lg mx-auto box-border">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-xl">📊</span>
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">アクティビティ履歴</h2>
                </div>
                <p className="text-gray-700 font-medium">✨ 最近のタスク操作履歴を確認しましょう！</p>
            </div>

            {logs.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <span className="text-3xl">📄</span>
                    </div>
                    <p className="text-gray-600 font-bold text-lg">🌱 履歴がまだありません</p>
                    <p className="text-gray-500 mt-2">タスクを作成して最初の一歩を踏み出しましょう！</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:from-blue-100 hover:to-purple-100 transition-all duration-300 border border-blue-200 hover:border-purple-300 shadow-lg hover:shadow-xl transform hover:scale-102">
                            <div className="flex-shrink-0 mt-1">
                                {getActionIcon(log.action)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getActionColor(log.action)} animate-pulse`}>
                                        {log.action.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-500">{log.created_at}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {log.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {logs.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gradient-to-r from-purple-200 to-pink-200">
                    <button className="w-full py-3 px-6 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        🔍 すべての履歴を表示 ✨
                    </button>
                </div>
            )}
        </div>
    );
}
