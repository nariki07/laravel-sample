# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリでコードを扱う際のガイダンスを提供します。

## 開発コマンド

### 基本開発環境
- **開発環境の起動**: `composer dev` - サーバー、キューワーカー、ログ、Viteを同時実行
- **サーバーのみ実行**: `php artisan serve`
- **キューの処理**: `php artisan queue:listen --tries=1`
- **ログの監視**: `php artisan pail --timeout=0`
- **フロントエンド開発**: `npm run dev`

### データベース操作
- **マイグレーション実行**: `php artisan migrate`
- **データベースリセット**: `php artisan migrate:fresh`
- **マイグレーション作成**: `php artisan make:migration create_table_name`

### テスト
- **テスト実行**: `composer test` (config:clearを含む) または `php artisan test`
- **単一テスト**: `php artisan test --filter=TestName`

### キュー管理
- **キューの監視**: `php artisan queue:listen`
- **単一ジョブ処理**: `php artisan queue:work --once`
- **失敗ジョブの削除**: `php artisan queue:flush`
- **失敗ジョブの再実行**: `php artisan queue:retry all`

### コード品質
- **コード整形**: `vendor/bin/pint` (Laravel Pint)
- **設定キャッシュクリア**: `php artisan config:clear`

## アーキテクチャ概要

これはクリーンアーキテクチャの原則を使用して、キューベースのアクティビティログ機能を持つタスク管理システムを実装したLaravel 12アプリケーションです。

### ドメイン駆動設計構造
- **ドメイン層**: `app/packages/domain/` - ビジネスロジックとインターフェースを含む
- **ユースケース層**: `app/packages/usecase/` - アプリケーションビジネスルールとオーケストレーション
- **アダプター層**: `app/packages/adapter/` - インフラ実装（リポジトリ、外部サービス）

### キューシステムアーキテクチャ
- **キュードライバー**: データベースベースのキューイング（デフォルト接続）
- **ジョブクラス**: `app/jobs/` - キュージョブの実装を含む
- **アクティビティログ**: `ActivityLogJob`による非同期アクティビティログ
- **キューテーブル**: 標準的なLaravelのjobs、job_batches、failed_jobsテーブル

### 主要コンポーネント
- **TaskController**: タスク作成のREST APIエンドポイント（`/api/tasks`）
- **CreateTaskUseCase**: キューディスパッチを含むタスク作成のビジネスロジック
- **ActivityLogJob**: タスクアクティビティログ用の非同期ジョブ
- **TaskRepository**: リポジトリパターンに従ったデータベース永続化層

### データベース設定
- **ドライバー**: SQLite (database/database.sqlite)
- **キューストレージ**: ジョブ管理用のデータベーステーブル
- **マイグレーション**: task、activity_logs、キュー関連テーブルを含む

### フロントエンド技術
- **フレームワーク**: React 18 with Vite 6
- **スタイリング**: TailwindCSS 4 + Bootstrap 5 + Sass
- **ビルドツール**: モダンフロントエンドツール用のVite
- **フロントエンドビルド**: `npm run build`

### パッケージ管理
- **バックエンド**: PHP依存関係のComposer
- **フロントエンド**: JavaScript/React依存関係のnpm
- **主要な依存関係**: Laravel Framework 12、Laravel UI、Laravel Pint、Redis対応のPredis

## キュー実装詳細

アプリケーションはジョブ処理にLaravelのデータベースキュードライバーを使用：
- キュージョブは`jobs`テーブルに保存
- 失敗したジョブは`failed_jobs`テーブルで追跡
- アクティビティログは`ActivityLogJob`により非同期で処理
- タスク作成は監査ログのキューディスパッチをトリガー

## 開発ノート

- PHP 8.2+とLaravel 12を使用
- 適切なアクティビティログのためにキューワーカーが実行されている必要がある
- `composer dev`スクリプトがフル開発スタック設定を処理
- Reactコンポーネントは`resources/js/components/`に配置
- APIエンドポイントは`/api/`プレフィックス下でRESTful規約に従う