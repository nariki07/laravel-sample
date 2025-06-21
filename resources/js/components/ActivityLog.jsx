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

    return (
        <div style={{ maxWidth: 400, margin: "auto", marginTop: 80}}>
            <h2 className="text-xl font-semibold mb-4 text-center">アクティビティ履歴</h2>
            {logs.length === 0 ? (
                <p className="text-center">履歴がまだありません。</p>
            ) : (
                <ul className="space-y-3">
                    {logs.map((log) => (
                        <li key={log.id} className="border-b pb-2">
                            <div className="text-sm text-gray-700">
                                <strong>{log.action}</strong> - {log.description}
                            </div>
                            <div className="text-xs text-gray-500">{log.created_at}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
