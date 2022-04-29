import { writable } from 'svelte/store';

export const guessHistory = writable([{ string: 'sawyerd' }, { string: 'teste' }]);

export const answerKey = writable({ answer: '', key: {}, guesses: 0 });
