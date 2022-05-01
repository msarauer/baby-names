<script lang="ts">
	export let letter: string;
	import { answerKey, guessHistory } from '../../stores/stores';

	const handleClick = () => {
		if (letter === 'enter') {
			if ($answerKey.answer.length === $guessHistory.at(-1)?.guess.length) {
				$guessHistory.at(-1).complete = true;
				$guessHistory = [...$guessHistory, { guess: '', complete: false }];
			}
		} else {
			$guessHistory.at(-1).guess += letter;
			$guessHistory = $guessHistory;
		}
	};
</script>

<button on:click={handleClick}>{letter}</button>

<style>
	button {
		background-color: rgb(122, 122, 122);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		border-radius: 7px;
		min-width: 38px;
		height: 48px;
		cursor: pointer;
		border: none;
		font-family: 'Roboto';
		font-size: 14px;
		text-transform: uppercase;
	}
</style>
