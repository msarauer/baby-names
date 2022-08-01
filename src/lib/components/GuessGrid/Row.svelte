<script lang="ts">
	import LetterBox from './LetterBox.svelte';
	import { guessHistory, answerKey, letters, tooEasy } from '../../stores/stores';
	import { checkGuess } from '$lib/functions/checkGuess';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let row: number;
	export let delay: number;
	export let resultKey: ResultKey = { key: '', correct: false };
	export let showHintButton = true;
	let clue = {};

	const giveHint = () => {
		showHintButton = false;
		if (row === 0) {
			clue = { i: 0, letter: $answerKey.answer[0] };
		} else {
			for (let i = 0; i < $answerKey.answer.length; i++) {
				if ($letters[$answerKey.answer[i]] < 3) {
					clue = { i, letter: $answerKey.answer[i] };
					break;
				}
			}
		}
	};

	$: {
		if ($guessHistory[row]?.complete) {
			const guessKey = $guessHistory[row].guess;
			const answer = $answerKey.answer;
			if (guessKey) {
				resultKey = checkGuess(guessKey, answer);

				for (let i = 0; i < guessKey.length; i++) {
					//check if each letter of the guess is better than previous guesses
					if (resultKey.key[i] > $letters[guessKey[i]]) {
						$letters[guessKey[i]] = resultKey.key[i];
					}
				}
				//set complete to false so that this row is not checked later
				$guessHistory[row].complete = false;

				//if there is only 1 incorrect letter left, the game is too easy and hints aren't allowed.
				if (!$tooEasy) {
					$tooEasy = true;
					setTimeout(() => {
						if (
							Object.values($letters).filter((letter) => letter === '3').length >=
							$answerKey.answer.length - 1
						) {
							$tooEasy = true;
						} else {
							$tooEasy = false;
						}
					}, delay * $answerKey.answer.length);
				}
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

<div class="guess-row" style="--num-chars:{$answerKey.answer.length}">
	<button
		on:click={() => {
			giveHint();
		}}
		class={row === $guessHistory.length - 1 && showHintButton && !$tooEasy
			? 'visible'
			: 'invisible'}>Hint?</button
	>

	{#each $answerKey.answer as letter, column}
		<LetterBox
			{clue}
			{column}
			{row}
			{delay}
			correct={resultKey.key[column] === '3'}
			partial={resultKey.key[column] === '2'}
			incorrect={resultKey.key[column] === '1'}
		/>
	{/each}
</div>

<style>
	.guess-row {
		display: flex;
		width: calc(var(--num-chars) * 60px);
		max-width: 80vw;
		height: 60px;
		max-height: calc(90vw / var(--num-chars));
		justify-content: space-between;
	}
</style>
