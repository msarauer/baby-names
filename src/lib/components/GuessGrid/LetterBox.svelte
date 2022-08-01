<script lang="ts">
	import { guessHistory } from '../../stores/stores';
	import { fade, scale } from 'svelte/transition';
	import { seeds } from '../../data/randomSeed';

	interface IClueObject {
		i?: number;
		letter?: string;
	}

	export let incorrect: boolean = false;
	export let partial: boolean = false;
	export let correct: boolean = false;
	export let column: number;
	export let row: number;
	export let delay: number;
	export let clue: IClueObject;
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
		transition = column * delay;
	}
	let BgUrl = `/assets/sq${randBg}.png`;
	const bgImage = `url('${BgUrl}')`;
</script>

{#if $guessHistory[row]?.guess[column]}
	<div class="letter-box" style="--bg-image:{bgImage}; --bg-status:{bgStatus}">
		{#if partial || correct || incorrect}
			<div class="check" transition:fade={{ delay: transition, duration: 150 }} />
		{/if}
		<div class="letter" in:scale={{ start: 2 }}>
			{$guessHistory[row].guess[column]}
		</div>
	</div>
{:else}
	<div class="letter-box-empty flex-col" style="--bg-image:{bgImage}; --bg-status:{bgStatus};">
		{#if column === clue.i}
			<span>{clue.letter}</span>
		{/if}
	</div>
{/if}

<style>
	.letter-box {
		min-width: calc(100% / 9);
		width: 100%;
		font-size: 200%;
		font-family: 'Nanum Pen Script', cursive;
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
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 200%;
		color: rgba(72, 186, 56, 0.732);
		min-width: calc(100% / 9);
		width: 100%;
		min-height: 100%;
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
