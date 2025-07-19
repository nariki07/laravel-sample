<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use app\packages\adapter\repository\task\TaskRepository;
use app\packages\usecase\task\CreateTaskUseCase;
use app\packages\usecase\task\dto\CreateTaskParam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use DateTime;
use Exception;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            // 入力のバリデーション
            $validated = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'due_date' => 'required|date',
            ])->validate();

            // 日付文字列をDateTimeオブジェクトに変換
            $dueDate = new DateTime($validated['due_date']);

            $param = new CreateTaskParam(
                $validated['title'],
                $validated['description'],
                $dueDate
            );

            $this->taskCreateUseCase()->create($param);

            return response()->json([
                'message' => 'タスクが正常に作成されました',
                'success' => true
            ], 201);

        } catch (ValidationException $e) {
            // バリデーションエラー時のレスポンス
            return response()->json([
                'message' => 'バリデーションエラー',
                'errors' => $e->errors(),
                'success' => false
            ], 422);
        } catch (Exception $e) {
            // その他のエラー
            \Log::error('Task creation error: ' . $e->getMessage());
            return response()->json([
                'message' => 'タスクの作成中にエラーが発生しました',
                'error' => $e->getMessage(),
                'success' => false
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function taskCreateUseCase() : CreateTaskUseCase
    {
        return new CreateTaskUseCase(
            new TaskRepository(DB::connection())
        );
    }
}
