import { useRouter } from 'next/router';

export function navigateTo(path: string, replace = false) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  if (replace) {
    router.replace(path);
  } else {
    router.push(path);
  }
}