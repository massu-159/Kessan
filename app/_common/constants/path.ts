// --- 認証 ---
// ログイン
export const loginPath = '/login'
// 新規登録
export const signupPath = '/signup'
// パスワードリセット
export const resetPasswordPath = '/reset-password'
// パスワードリセット確認
export const resetPasswordConfirmPath = '/reset-password/confirm'
// コールバック
export const callbackPath = '/callback'

// --- アプリ ---
// ダッシュボード
export const dashboardPath = '/dashboard'
// 資産合計
export const totalAssetsPath = '/total-assets'
// 個別資産
export const financePath = '/finance'

// --- 設定 ---
// 設定(基底)
export const settingsPath = '/settings'
// プロフィール
export const profilePath = `${settingsPath}/profile`
// メールアドレス
export const emailPath = `${settingsPath}/email`
// パスワード
export const passwordPath = `${settingsPath}/password`
// ログアウト
export const logoutPath = `${settingsPath}/logout`
