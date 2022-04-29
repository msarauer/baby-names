<script lang="ts">
	import LetterBox from './LetterBox.svelte';

	const guess: string = 'sawyers';
	export let row: number;

	import { guessHistory } from '../../stores/stores';
</script>

<div class="guess-row">
	{#each guess as letter, column}
		<LetterBox {column} {row} />
	{/each}
</div>

<style>
	.guess-row {
		display: flex;
		gap: 0.7em;
	}
</style>
