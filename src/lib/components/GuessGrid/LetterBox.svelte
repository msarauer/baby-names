<script lang="ts">
	export let letter: string = '';
	export let tbd: boolean = false;
	export let incorrect: boolean = false;
	export let partial: boolean = false;
	export let correct: boolean = false;
	export let guess: string = '';
	export let column: number;
	export let row: number;

	import { guessHistory } from '../../stores/stores';

	$: {
		if ($guessHistory[row]?.string[column] === guess[column]) {
			correct = true;
		}
	}

	// how many of current letter
	// if current letter is in correct spot
	// if current letter exists previously
	// if current letter exists later in the word and is in correct spot already
	// if
</script>

{#if $guessHistory[row]}
	<div class:tbd class:incorrect class:partial class:correct class="letter-box">
		{$guessHistory[row].string[column] ?? ''}
	</div>
{:else}
	<div class:tbd class:incorrect class:partial class:correct class="letter-box">{letter}</div>
{/if}

<style>
	.letter-box {
		outline: 2px solid rgb(101, 101, 101);
		width: 60px;
		height: 60px;
		font-size: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-transform: uppercase;
	}

	.tbd {
	}

	.incorrect {
		background-color: rgb(78, 78, 78);
		outline: none;
	}

	.partial {
		background-color: rgb(172, 95, 165);
		outline: none;
	}

	.correct {
		background-color: rgb(50, 107, 153);
		outline: none;
	}
</style>
