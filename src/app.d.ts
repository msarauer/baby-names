/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
type AnswerKey = {
	answer: string;
	guesses: number;
};
type ResultKey = {
	key: string;
	correct: boolean;
};
