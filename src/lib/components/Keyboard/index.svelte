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
		align-items: center;
		gap: 6px;
	}
	.row {
		display: flex;
		justify-content: center;
		gap: 6px;
		touch-action: manipulation;
	}
</style>
