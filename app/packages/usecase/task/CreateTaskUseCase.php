<?php

namespace app\packages\usecase\task;

use App\Jobs\ActivityLogJob;
use app\packages\domain\task\ITaskRepository;
use app\packages\domain\task\Task;
use app\packages\usecase\task\dto\CreateTaskParam;
use Illuminate\Support\Facades\DB;

/**
 * タスクを新規作成するユースケース
 */
class CreateTaskUseCase
{
    private ITaskRepository $taskRepository;

    public function __construct(ITaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function create(CreateTaskParam $param) : void
    {
        $task = Task::create($param->getTitle(), $param->getDescription(), $param->getDueDate());
        $this->taskRepository->insert($task);

        // データベースから生成されたIDを取得
        $taskId = DB::getPdo()->lastInsertId();

        // キューにジョブを送信（非同期で実行）
        dispatch(new ActivityLogJob(
            (int)$taskId,
            'created',
            "タスク '{$task->getTitle()}' を作成しました"
        ));
    }
}
