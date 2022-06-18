<script lang="ts">
	import Row from './Row.svelte';
	import { answerKey, gameOver, openModal } from '../../stores/stores';
	import Balloons from '$lib/components/Balloons/index.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';

	export let delay: number;

	let showBalloons = false;

	let loser = false;

	const handleWin = () => {
		setTimeout(() => {
			$openModal.success = true;
			showBalloons = true;
			$gameOver = true;
		}, delay * $answerKey.answer.length);
	};

	const handleLose = () => {
		setTimeout(() => {
			$gameOver = true;
			$openModal.fail = true;
		}, delay * $answerKey.answer.length);
	};
</script>

<div class="guess-grid">
	{#if showBalloons}
		<div class="balloons"><Balloons /></div>{/if}
	{#each Array($answerKey.guesses) as item, row}
		<Row {row} {delay} on:win={handleWin} on:lose={handleLose} />
	{/each}
	<!-- {#if $openModal.success} -->
	<Modal content="Success" isOpen={$openModal.success} url={window.location.href} />
	<Modal content="Fail" isOpen={$openModal.fail} />
	<!-- {:else if loser}
		You Lose!!!
	{/if} -->
</div>

<style>
	.guess-grid {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.balloons {
		position: fixed;
		padding: 0;
		margin: 0;

		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		z-index: 2;
	}
</style>
