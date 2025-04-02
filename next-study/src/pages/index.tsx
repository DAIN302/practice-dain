export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <a href="/routing">STATIC</a>
        </li>
        <li>
          <a href="/routing/dynamic/1234">DYNAMIC</a>
        </li>
        <li>
          <a href="/routing/nested/asdf/routing">NESTED</a>
        </li>
        <li>
          <a href="/routing/catch-all-segments/a/b/c/d/e/12345">CATCH</a>
        </li>
      </ul>
    </main>
  );
}
