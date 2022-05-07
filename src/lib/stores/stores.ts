import { writable } from 'svelte/store';

export const guessHistory = writable([{ guess: '', complete: false }]);

export const answerKey = writable({ answer: '', guesses: 0 });

export const letters = writable({
	q: '',
	w: '',
	e: '',
	r: '',
	t: '',
	y: '',
	u: '',
	i: '',
	o: '',
	p: '',
	a: '',
	s: '',
	d: '',
	f: '',
	g: '',
	h: '',
	j: '',
	k: '',
	l: '',
	z: '',
	x: '',
	c: '',
	v: '',
	b: '',
	n: '',
	m: ''
});
