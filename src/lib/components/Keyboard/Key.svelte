<script lang="ts">
	import { fade } from 'svelte/transition';
	import { answerKey, guessHistory } from '../../stores/stores';

	export let letter: string;
	export let colorCode: string = '';
	export let delay: number = 0;

	const colorKey: {
		[key: string]: string;
	} = {
		'1': 'bg-neutral text-neutral-content',
		'2': 'bg-warning text-warning-content',
		'3': 'bg-success text-success-content'
	};

	const handleClick = () => {
		if (letter === 'enter') {
			if ($answerKey.answer.length === $guessHistory.at(-1)?.guess.length) {
				$guessHistory.at(-1)!.complete = true;
				$guessHistory = [...$guessHistory, { guess: '', complete: false }];
			}
		} else if (letter === 'del') {
			$guessHistory.at(-1)!.guess = $guessHistory.at(-1)!.guess.slice(0, -1);
			//This line is necessary to trigger a re-render
			$guessHistory = $guessHistory;
		} else {
			if ($guessHistory.at(-1)!.guess.length < $answerKey.answer.length) {
				$guessHistory.at(-1)!.guess += letter;
				//This line is necessary to trigger a re-render
				$guessHistory = $guessHistory;
			}
		}
	};
</script>

<div style="--bg-delay: {delay * $answerKey.answer.length}ms">
	<button on:click={handleClick} class="bg-base-200 delay kbd md:text-[22px] {colorKey[colorCode]}"
		>{letter}</button
	>
</div>

<style>
	button {
		cursor: pointer;
		font-family: 'Nanum Pen Script', cursive;
		text-transform: uppercase;
		user-select: none;
	}
	.delay {
		transition: background-color color 500ms linear;
		transition-delay: var(--bg-delay);
	}
</style>
