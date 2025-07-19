<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;

Route::post('tasks', [TaskController::class, 'store']);
