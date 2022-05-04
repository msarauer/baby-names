<script lang="ts">
	import Row from './Row.svelte';
	import { answerKey } from '../../stores/stores';

	let winner = false;
	let loser = false;

	const handleWin = () => {
		winner = true;
	};

	const handleLose = () => {
		loser = true;
	};
</script>

<div class="guess-grid">
	{#if winner}
		You win!!!
	{:else if loser}
		You Lose!!!
	{:else}
		{#each Array($answerKey.guesses) as item, row}
			<Row {row} on:win={handleWin} on:lose={handleLose} />
		{/each}
	{/if}
</div>

<style>
	.guess-grid {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.7em;
	}
</style>
