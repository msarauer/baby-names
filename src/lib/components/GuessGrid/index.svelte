<script lang="ts">
	import Row from './Row.svelte';
	import { answerKey } from '../../stores/stores';
</script>

<div class="guess-grid">
	{#each Array($answerKey.guesses) as item, row}
		<Row {row} />
	{/each}
</div>

<style>
	.guess-grid {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.7em;
	}
</style>
