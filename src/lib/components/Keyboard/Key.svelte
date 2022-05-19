<script lang="ts">
	import { fade } from 'svelte/transition';
	import { answerKey, guessHistory } from '../../stores/stores';

	export let letter: string;
	export let colorCode: string = '';
	export let delay: number = 0;

	const colorKey: {
		[key: string]: string;
	} = {
		'1': 'dark',
		'2': 'yellow',
		'3': 'green'
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
	<button on:click={handleClick} class={colorKey[colorCode]}>{letter}</button>
</div>

<style>
	button {
		background-color: rgb(152, 152, 152);
		color: white;
		border-radius: 4px;
		height: 58px;
		cursor: pointer;
		border: none;
		font-family: 'Nanum Pen Script', cursive;
		font-size: 22px;
		text-transform: uppercase;
		user-select: none;
		padding: 0;
		min-width: 30px;
		max-width: 80px;
		margin: 0;
	}
	.dark {
		background-color: rgb(49, 49, 49);
		transition: background-color 500ms linear;
		transition-delay: var(--bg-delay);
	}
	.yellow {
		background-color: rgb(253, 178, 88);
		transition: background-color 500ms linear;
		transition-delay: var(--bg-delay);
	}
	.green {
		background-color: rgb(84, 183, 42);
		transition: background-color 500ms linear;
		transition-delay: var(--bg-delay);
	}
</style>
