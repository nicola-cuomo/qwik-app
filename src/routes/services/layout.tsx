import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    // header with links to home page
    return (<>
        <header>
            <Link href="/">Home</Link>
        </header>
        <Slot />
        <footer>
            <p>© 2021 Qwik City</p>
        </footer>
    </>);
}
);
