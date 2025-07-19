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
            created: "bg-green-100 text-green-800",
            updated: "bg-blue-100 text-blue-800",
            deleted: "bg-red-100 text-red-800"
        };
        return colors[action] || colors.updated;
    };

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 h-fit">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">アクティビティ履歴</h2>
                <p className="text-gray-600 text-sm">最近のタスク操作履歴</p>
            </div>

            {logs.length === 0 ? (
                <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500">履歴がまだありません</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-shrink-0 mt-1">
                                {getActionIcon(log.action)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
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
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        すべての履歴を表示
                    </button>
                </div>
            )}
        </div>
    );
}
