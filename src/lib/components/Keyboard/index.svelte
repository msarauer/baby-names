<script lang="ts">
	import Key from './Key.svelte';
	const lets = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
	import { letters } from '../../stores/stores';
</script>

<div class="keyboard">
	{#each lets as row, i}
		{#if i === 2}
			<div class="row">
				<Key letter="enter" />
				{#each row as letter}
					<Key {letter} colorCode={$letters[letter]} />
				{/each}
				<Key letter="del" />
			</div>
		{:else}
			<div class="row">
				{#each row as letter}
					<Key {letter} colorCode={$letters[letter]} />
				{/each}
			</div>
		{/if}
	{/each}
</div>

<style>
	.keyboard {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin: 0 8px;
		height: 200px;
	}
	.row {
		display: flex;
		justify-content: center;
		gap: 6px;
		width: 100%;
		touch-action: manipulation;
		margin: 0 auto 8px;
	}
</style>
