import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const serviceType = useLocation().params.serviceType;

    return (
        <>
            <h1>Book your {serviceType} online</h1>
            <p>Choose a time and date</p>

        </>
    );
}
);