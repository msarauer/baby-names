<script lang="ts">
	import Row from './Row.svelte';
	import { answerKey } from '../../stores/stores';

	export let delay: number;

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
	{#each Array($answerKey.guesses) as item, row}
		<Row {row} {delay} on:win={handleWin} on:lose={handleLose} />
	{/each}
	{#if winner}
		You win!!!{:else if loser}
		You Lose!!!
	{/if}
</div>

<style>
	.guess-grid {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
</style>
