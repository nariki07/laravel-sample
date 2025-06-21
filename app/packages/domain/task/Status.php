<?php

namespace app\packages\domain\task;

/**
 * ステータス
 */
enum Status: string
{
    case TODO = '未着手';
    case INPROGRESS = '進行中';
    case COMPLETE = '完了';
    case PENDING = '保留中';
    case CANSEL = '取消';
}
