<script lang="ts">
	import LetterBox from './LetterBox.svelte';
	import { guessHistory, answerKey } from '../../stores/stores';
	import { checkGuess } from '$lib/functions/checkGuess';
	export let row: number;
	let resultKey: string = '';
	$: {
		if ($guessHistory[row]?.complete) {
			const guessKey = $guessHistory[row].guess;
			const answer = $answerKey.answer;
			if (guessKey) {
				resultKey = checkGuess(guessKey, answer);
			}
		}
	}
</script>

<div class="guess-row">
	{#each $answerKey.answer as letter, column}
		<LetterBox
			{column}
			{row}
			correct={resultKey[column] === 'c'}
			partial={resultKey[column] === 'p'}
			incorrect={resultKey[column] === 'x'}
		/>
	{/each}
</div>

<style>
	.guess-row {
		display: flex;
		gap: 0.7em;
	}
</style>
