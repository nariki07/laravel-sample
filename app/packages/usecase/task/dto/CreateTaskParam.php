<?php

namespace app\packages\usecase\task\dto;

use DateTime;

class CreateTaskParam
{
    private string $title;
    private string $description;
    private DateTime $due_date;

    public function __construct(string $title, string $description, DateTime $due_date)
    {
        $this->title = $title;
        $this->description = $description;
        $this->due_date = $due_date;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getDueDate(): DateTime
    {
        return $this->due_date;
    }
}
