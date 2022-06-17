<script lang="ts">
	import { answerKey, guessHistory } from '../../stores/stores';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let letter: string;
	export let colorCode: string = '';
	export let delay: number = 0;
	export let key: string;

	export let locked: boolean;

	const colorKey: {
		[key: string]: string;
	} = {
		'1': 'bg-base-content text-base-100',
		'2': 'bg-warning text-warning-content',
		'3': 'bg-success text-success-content'
	};

	const handleClick = () => {
		if (letter === 'enter') {
			if ($answerKey.answer.length === $guessHistory.at(-1)?.guess.length) {
				dispatch('checking');

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
	$: {
		if (key === letter && !locked) {
			handleClick();
		}
	}
</script>

<div style="--bg-delay: {delay * $answerKey.answer.length}ms">
	<button
		on:click={handleClick}
		disabled={locked}
		class="delay kbd md:text-[22px] {colorKey[colorCode]}"
	>
		{letter}
	</button>
</div>

<style>
	button {
		cursor: pointer;
		font-family: 'Nanum Pen Script', cursive;
		text-transform: uppercase;
		user-select: none;
	}
	.delay {
		transition: all 500ms linear;
		transition-delay: var(--bg-delay);
	}
</style>
