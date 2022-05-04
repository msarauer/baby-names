<script lang="ts">
	import LetterBox from './LetterBox.svelte';
	import { guessHistory, answerKey } from '../../stores/stores';
	import { checkGuess } from '$lib/functions/checkGuess';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let row: number;
	export let resultKey: ResultKey = { key: '', correct: false };
	$: {
		if ($guessHistory[row]?.complete) {
			const guessKey = $guessHistory[row].guess;
			const answer = $answerKey.answer;
			if (guessKey) {
				resultKey = checkGuess(guessKey, answer);
			}
			if (resultKey.correct) {
				dispatch('win');
			}
			// if you submit on last row without winning, dispatch loase event
			if ($answerKey.guesses - 1 === row) {
				dispatch('lose');
			}
		}
	}
</script>

<div class="guess-row">
	{#each $answerKey.answer as letter, column}
		<LetterBox
			{column}
			{row}
			correct={resultKey.key[column] === 'c'}
			partial={resultKey.key[column] === 'p'}
			incorrect={resultKey.key[column] === 'x'}
		/>
	{/each}
</div>

<style>
	.guess-row {
		display: flex;
		gap: 0.7em;
	}
</style>
