<script lang="ts">
	import Key from './Key.svelte';
	import { letters, answerKey, gameOver } from '../../stores/stores';

	const lets = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

	export let delay: number;

	let key: string;

	let locked = false;

	$: {
		if ($gameOver === true) locked = true;
	}

	function handleChecking() {
		locked = true;
		setTimeout(() => {
			locked = false;
		}, delay * $answerKey.answer.length);
	}

	function handleKeydown(event) {
		key = event.key === 'Backspace' ? 'del' : event.key.toLowerCase();
	}
</script>

<svelte:window
	on:keydown={handleKeydown}
	on:keyup={() => {
		key = '';
	}}
/>

<div class="keyboard">
	{#each lets as row, i}
		{#if i === 2}
			<div class="row">
				<kbd> <Key letter="enter" {key} {locked} on:checking={handleChecking} /></kbd>
				{#each row as letter}
					<kbd><Key {letter} {delay} colorCode={$letters[letter]} {key} {locked} /></kbd>
				{/each}
				<kbd><Key letter="del" {key} {locked} /></kbd>
			</div>
		{:else}
			<div class="row">
				{#each row as letter}
					<kbd><Key {letter} {delay} colorCode={$letters[letter]} {key} {locked} /></kbd>
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
		padding-bottom: 10px;
	}
	.row {
		display: flex;
		justify-content: center;
		touch-action: manipulation;
		gap: 2px;
	}
</style>
