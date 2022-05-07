<script lang="ts">
	import LetterBox from './LetterBox.svelte';
	import { guessHistory, answerKey, letters } from '../../stores/stores';
	import { checkGuess } from '$lib/functions/checkGuess';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let row: number;
	export let resultKey: ResultKey = { key: '', correct: false };
	interface letterObj {
		[key: string]: string;
	}
	$: {
		if ($guessHistory[row]?.complete) {
			const guessKey = $guessHistory[row].guess;
			const answer = $answerKey.answer;
			if (guessKey) {
				resultKey = checkGuess(guessKey, answer);

				for (let i = 0; i < guessKey.length; i++) {
					if (resultKey.key[i] > $letters[guessKey[i]]) {
						$letters[guessKey[i]] = resultKey.key[i];
					}
				}
				$guessHistory[row].complete = false;
			}
			if (resultKey.correct) {
				dispatch('win');
			}
			// if you submit on last row without winning, dispatch lose event
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
			correct={resultKey.key[column] === '3'}
			partial={resultKey.key[column] === '2'}
			incorrect={resultKey.key[column] === '1'}
		/>
	{/each}
</div>

<style>
	.guess-row {
		display: flex;
		gap: 0.7em;
	}
</style>
