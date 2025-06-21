<?php

namespace app\packages\usecase\task;

use app\jobs\ActivityLogJob;
use app\packages\domain\task\ITaskRepository;
use app\packages\domain\task\Task;
use app\packages\usecase\task\dto\CreateTaskParam;

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

        // キューにジョブを送信（非同期で実行）
        dispatch(new ActivityLogJob(
            $task->getId(),
            'created',
            "タスク '{$task->getTitle()}' を作成しました"
        ));
    }
}
