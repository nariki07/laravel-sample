<?php

namespace App\Jobs;

use App\Models\ActivityLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ActivityLogJob implements ShouldQueue
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
