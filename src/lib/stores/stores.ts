import { writable } from 'svelte/store';

export const guessHistory = writable([{ guess: '', complete: false }]);

export const answerKey = writable({ answer: '', guesses: 0 });
