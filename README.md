# Hono + Prisma Boilerplate

このプロジェクトは [Hono](https://hono.dev/) をバックエンドフレームワークに、[Prisma](https://www.prisma.io/) をORMとして使用した、MySQL対応のTypeScriptベースのWebバックエンド環境です。Dockerで簡単に立ち上げられるよう構成されています。

---

## 🚀 初回環境構築手順

### 1. 必要な依存のインストール（初回のみ）

プロジェクトディレクトリで以下を実行してください：

```bash
npm install
```

### 2. TypeScript ビルド（初回ビルド or ソース変更時）

```bash
npx tsc
```

※ `dist/app.js` が生成される必要があります。

### 3. Docker コンテナ起動

```bash
docker compose up -d
```

MySQL (`db`) と Node アプリ (`app`) が立ち上がり、`http://localhost:3001` でアプリにアクセスできます。

---

## 📦 マイグレーションファイルの追加・更新

### 1. Prisma スキーマを編集

`prisma/schema.prisma` を編集し、モデルの追加や変更を行います。

例：

```prisma
model Post {
  id      Int     @id @default(autoincrement())
  title   String
  content String?
}
```

### 2. マイグレーションの作成

```bash
docker compose exec app npx prisma migrate dev --name add-post
```

これにより、`prisma/migrations` フォルダに新しいマイグレーションが作成されます。

### 3. Prisma Client の再生成（自動で行われますが、明示的にも可能）

```bash
docker compose exec app npx prisma generate
```

---

## 🔄 マイグレーションの実行・ロールバック方法

### ✅ マイグレーションの適用（本番・起動時用）

Docker コンテナ起動時、`npx prisma migrate deploy` によりマイグレーションは自動で適用されます。

手動で実行する場合：

```bash
docker compose exec app npx prisma migrate deploy
```

---

### 🔁 マイグレーションのロールバック（開発中の巻き戻し）

Prismaでは正式な「ロールバック」コマンドは提供されていませんが、以下の方法で巻き戻し可能です。

#### 1. 最新のマイグレーションを `RESET` する（全削除 + 初期化）

```bash
docker compose exec app npx prisma migrate reset
```

> ⚠️ これにより **すべてのデータが削除**されます。開発中のみ実行してください。

#### 2. マイグレーションファイルを削除して再作成

```bash
rm -rf prisma/migrations
docker compose exec app npx prisma migrate dev --name new-init
```

---

### 🛠 開発中におすすめのワークフロー

1. `schema.prisma` を編集
2. `npx prisma migrate dev --name something`
3. 必要に応じて `npx prisma migrate reset` でやり直す
4. 最終的に `npx prisma migrate deploy` を実行（本番を想定）

---
