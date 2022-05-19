<script lang="ts">
	import Key from './Key.svelte';
	import { letters } from '../../stores/stores';

	const lets = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

	export let delay: number;
</script>

<div class="keyboard">
	{#each lets as row, i}
		{#if i === 2}
			<div class="row">
				<Key letter="enter" />
				{#each row as letter}
					<Key {letter} {delay} colorCode={$letters[letter]} />
				{/each}
				<Key letter="del" />
			</div>
		{:else}
			<div class="row">
				{#each row as letter}
					<Key {letter} {delay} colorCode={$letters[letter]} />
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
		max-width: 350px;
	}
	.row {
		display: flex;
		justify-content: center;
		touch-action: manipulation;
		gap: 3px;
	}
</style>
