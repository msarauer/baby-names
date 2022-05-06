<script lang="ts">
	import Key from './Key.svelte';
	import { letters } from '../../stores/stores';
	// const letters: string[] = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
</script>

<div class="keyboard">
	{#each $letters as row, i}
		<div class="row">
			{#each row as letter}
				<Key letter={Object.keys(letter)[0]} colorCode={Object.values(letter)[0]} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.keyboard {
		display: flex;
		flex-direction: column;
		margin-top: 3em;
		gap: 0.5em;
	}
	.row {
		display: flex;
		justify-content: center;
		gap: 0.3em;
	}
</style>
