<?php

namespace app\packages\adapter\repository\task;

use app\packages\domain\task\ITaskRepository;
use app\packages\domain\task\Task;
use Illuminate\Database\Connection;

class TaskRepository implements ITaskRepository
{
    private Connection $db;

    public function __construct(Connection $db)
    {
        $this->db = $db;
    }

    public function insert(Task $task): void
    {
        $this->db->table('tasks')->insert([
            'title' => $task->getTitle(),
            'description' => $task->getDescription(),
            'status' => $task->getStatus()->value,
            'due_date' => $task->getDueDate()->format('Y-m-d'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
