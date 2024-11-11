import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <span>Hi 👋 Select a service</span>
      <nav class="mt-4 flex flex-col space-y-4">
        <Link href="/services/haircut" class="text-blue-500 hover:underline">
          Haircut
        </Link>
        <Link href="/services/manicure" class="text-blue-500 hover:underline">
          Manicure
        </Link>
        <Link href="/services/pedicure" class="text-blue-500 hover:underline">
          Pedicure
        </Link>
      </nav>
    </>
  );
});

export const head: DocumentHead = {
  title: "Services!!!",
  meta: [
    {
      name: "Book a service",
      content: "Book services online",
    },
  ],
};
