import { UserCircleIcon, EnvelopeIcon, KeyIcon, PowerIcon } from "@heroicons/react/24/solid";
import { profilePath, emailPath, passwordPath, logoutPath } from "./path";

// セッティングのサブナビゲーション
export const subNavigation = [
  {
    name: 'プロフィール',
    icon: UserCircleIcon,
    href: profilePath,
  },
  {
    name: 'メールアドレス',
    icon: EnvelopeIcon,
    href: emailPath,
  },
  {
    name: 'パスワード',
    icon: KeyIcon,
    href: passwordPath,
  },
  {
    name: 'ログアウト',
    icon: PowerIcon,
    href: logoutPath,
  },
]
