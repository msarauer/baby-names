import { writable } from 'svelte/store';

export const guessHistory = writable([{ guess: '', complete: false }]);

export const answerKey = writable({ answer: '', guesses: 0 });

export const gameOver = writable(false);

export const openModal = writable({ success: false, fail: false });

export const babyDetails = writable({
	babyName: '',
	babyMiddle: '',
	babyLast: '',
	birthday: null,
	gender: '',
	lbs: null,
	message: '',
	otherNames: null,
	oz: null,
	parent1: '',
	parent2: '',
	weight: false
});

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
