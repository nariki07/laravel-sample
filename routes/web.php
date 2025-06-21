<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/task/create', function () {
    return view('task.create'); // resources/views/task/create.blade.php を表示
});
