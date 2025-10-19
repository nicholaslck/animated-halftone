import { effect, signal } from "@preact/signals-react";

export const file = signal<File | null>(null);

effect(() => console.debug(file.value?.name));
