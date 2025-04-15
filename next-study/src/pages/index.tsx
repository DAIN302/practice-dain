import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link href="/routing">STATIC</Link>
        </li>
        <li>
          <Link href="/routing/dynamic/1234">DYNAMIC</Link>
        </li>
        <li>
          <Link href="/routing/nested/asdf/routing">NESTED</Link>
        </li>
        <li>
          <Link href="/routing/catch-all-segments/a/b/c/d/e/12345">CATCH</Link>
        </li>
      </ul>
    </main>
  );
}


// Link 는 개발자 모드에서 동작을 안하고 build 후에 동작
// npm run build 로 빌드 후 npm run start 로 서버 시작