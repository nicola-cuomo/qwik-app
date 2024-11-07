import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Hi 👋 Select a service</h1>
      <ul>
        <li>
          <Link href="/services/haircut">Haircut</Link>
        </li>
        <li>
          <Link href="/services/manicure">Manicure</Link>
        </li>
        <li>
          <Link href="/services/pedicure">Pedicure</Link>
        </li>
      </ul>
    </>
  );
});

export const head: DocumentHead = {
  title: "Services!!!",
  meta: [
    {
      name: "description",
      content: "Book services online",
    },
  ],
};
