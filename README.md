<img width="1000" alt="kessanのTop画面" src="https://github.com/massu-159/Kessan/assets/75517054/b349696c-26b9-435d-8168-4d805fff0bfd">

# Kessan
金融機関と残高を登録。決算を見る感覚で資産を管理できるWebアプリケーションです。
Next.js AppRouter を使用しています。
DBには Supabase を使用しています。
認証機能には Supabase Auth を使用しています。

urlはこちら
https://kessan-mu.vercel.app/

テストユーザーを用意しているので、触ってみてください。

```
メールアドレス： test_user@testsample.com
パスワード： testuser02
```

## 目次
1. 環境構築
2. アプリケーションの仕様
3. 環境変数

## 1. 環境構築

### 1-1. ライブラリ インストール

```Bash
npm install

または

yarn
```

### 1-2. アプリケーション実行

```Bash
npm run dev

または

yarn dev
```

## 2. アプリケーションの仕様

### 2-1. 仕様
- 金融機関
  - 金融機関新規登録処理
  - 金融機関更新処理
  - 金融機関削除処理
- 残高
  - 残高新規登録処理
  - 残高更新処理
  - 残高削除処理
- 目標
  - 目標新規登録処理
  - 目標更新処理
  - 目標削除処理
- 認証
  - 会員登録
  - ログイン(ログアウト)
  - 会員情報更新処理
  - パスワード再設定処理
  - メール通知処理

### 2-2. 構成技術
- next: 13.4.9,
- react: 18.2.0,
- typescript: 5.1.6,
- @heroicons/react: ^2.0.18,
- react-hook-form: ^7.45.1,
- @hookform/resolvers: ^3.1.1,
- zod: ^3.21.4,
- zustand: ^4.3.9
- uuid: ^9.0.0,
- @supabase/auth-helpers-nextjs: ^0.7.2,
- recharts: ^2.7.2,
- tailwindcss: ^3.3.2
- @material-tailwind/react: ^2.0.5,
- eslint: 8.44.0,
- prettier: ^3.0.0,

## 環境変数
.envを作成し、環境変数を設定。
```.env
NEXT_PUBLIC_SUPABASE_URL=xxxxxxxxxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxx
```
