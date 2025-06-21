<?php

namespace app\jobs;

class ActivityLogJob
{
    use InteractsWithQueue, Queueable, SerializesModels;

    private int $taskId;
    private string $action;
    private string $description;

    public function __construct(int $taskId, string $action, string $description)
    {
        $this->taskId = $taskId;
        $this->action = $action;
        $this->description = $description;
    }

    public function handle(): void
    {
        ActivityLog::create([
            'task_id' => $this->taskId,
            'action' => $this->action,
            'description' => $this->description,
        ]);
    }
}
