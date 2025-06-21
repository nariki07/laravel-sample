<?php

namespace app\packages\domain\task;

use DateTime;

/**
 * タスク
 */
class Task
{
    private int $id;
    private string $title;
    private string $description;
    private Status $status;
    private DateTime $due_date;

    private function __construct(
        int $id,
        string $title,
        string $description,
        Status $status,
        DateTime $due_date
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->status = $status;
        $this->due_date = $due_date;
    }

    public static function create(string $title, string $description, DateTime $due_date) : self
    {
        return new self(null, $title, $description, Status::TODO, $due_date);
    }

    public static function reconstruct(int $id, string $title, string $description, DateTime $due_date) : self
    {
        return new self($id, $title, $description, Status::TODO, $due_date);
    }

    // ゲッター
    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStatus(): Status
    {
        return $this->status;
    }

    public function getDueDate(): DateTime
    {
        return $this->due_date;
    }
}
