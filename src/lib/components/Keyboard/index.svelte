<script lang="ts">
	import Key from './Key.svelte';
	const letters: string[] = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
</script>

<div class="keyboard">
	{#each letters as row, i}
		{#if i === letters.length - 1}
			<div class="row">
				<Key letter="Enter" />
				{#each row as letter}
					<Key {letter} />
				{/each}
				<Key letter="Del" />
			</div>
		{:else}
			<div class="row">
				{#each row as letter}
					<Key {letter} />
				{/each}
			</div>
		{/if}
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
