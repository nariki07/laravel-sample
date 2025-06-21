import React, { useState } from "react";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("todo");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = { title, description, status, due_date: dueDate };
        console.log("Submit task:", task);
        // ここにAPI送信などを追加可能
    };

    return (
        <form onSubmit={handleSubmit} style={{maxWidth: 400, margin: "auto"}}>
            <h1>タスク作成フォーム</h1>
            <h2>タスク作成</h2>
            <div>
                <label>タイトル</label><br/>
                <input value={title} onChange={e => setTitle(e.target.value)} required/>
            </div>
            <div>
                <label>説明</label><br/>
                <textarea value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <div>
                <label>ステータス</label><br/>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>
            <div>
                <label>期限</label><br/>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)}/>
            </div>
            <button type="submit">タスクを保存</button>
        </form>
    );
}
