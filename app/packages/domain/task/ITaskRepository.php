<?php

namespace app\packages\domain\task;

interface ITaskRepository
{
    /**
     * タスクを登録する.
     *
     * @param Task $task
     */
    public function insert(Task $task) : void;
}
