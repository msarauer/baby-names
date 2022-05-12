<script lang="ts">
	import { guessHistory } from '../../stores/stores';
	import { fade } from 'svelte/transition';
	import { seeds } from '../../data/randomSeed';
	export let letter: string = '';
	export let incorrect: boolean = false;
	export let partial: boolean = false;
	export let correct: boolean = false;

	export let column: number;
	export let row: number;

	//using predictable seeds so that the server and client rendering are the same (they were different with Math.random())
	export let randBg = seeds[row][column];

	let color = '';
	let bgStatus: string;
	let BgStatusUrl: string;
	let transition: number;
	$: {
		if (partial) {
			color = 'orange';
		} else if (correct) {
			color = 'green';
		} else if (incorrect) {
			color = 'grey';
		}
		BgStatusUrl = `/assets/${color}.png`;
		bgStatus = `url('${BgStatusUrl}')`;
		transition = column * 600;
	}
	let BgUrl = `/assets/sq${randBg}.png`;
	const bgImage = `url('${BgUrl}')`;
</script>

{#if $guessHistory[row]}
	<div class="letter-box" style="--bg-image:{bgImage}; --bg-status:{bgStatus}">
		{#if partial || correct || incorrect}
			<div
				class="check"
				transition:fade={{ delay: transition, duration: 150 }}
				style="--bg-transition:{transition}"
			/>
		{/if}
		<div class="letter">
			{$guessHistory[row].guess[column] ?? ''}
		</div>
	</div>
{:else}
	<div class="letter-box-empty" style="--bg-image:{bgImage}; --bg-status:{bgStatus};">
		{letter}
	</div>
{/if}

<style>
	.letter-box {
		width: 60px;
		height: 60px;
		font-size: 100%;
		background-image: var(--bg-image);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: uppercase;
		position: relative;
		color: rgb(0, 0, 0);
	}
	.check {
		background-image: var(--bg-status);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: 60px;
		height: 100%;
		position: absolute;
	}
	.letter {
		z-index: 1;
	}
	.letter-box-empty {
		width: 60px;
		height: 60px;
		font-size: 40px;
		background-image: var(--bg-image);
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}
	@keyframes flip {
		0% {
			transform: rotateX(0);
		}
		45% {
			transform: rotateX(90deg);
		}
		55% {
			transform: rotateX(90deg);
		}
		100% {
			transform: rotateX(0);
		}
	}
</style>
