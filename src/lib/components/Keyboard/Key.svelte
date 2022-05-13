<script lang="ts">
	export let letter: string;
	export let colorCode: string;
	import { answerKey, guessHistory } from '../../stores/stores';

	const colorKey: {
		[key: string]: string;
	} = {
		'1': 'dark',
		'2': 'yellow',
		'3': 'green'
	};

	const handleClick = () => {
		if (letter === 'enter') {
			if ($answerKey.answer.length === $guessHistory.at(-1)?.guess.length) {
				$guessHistory.at(-1)!.complete = true;
				$guessHistory = [...$guessHistory, { guess: '', complete: false }];
			}
		} else if (letter === 'del') {
			$guessHistory.at(-1)!.guess = $guessHistory.at(-1)!.guess.slice(0, -1);
			//This line is necessary to trigger a re-render
			$guessHistory = $guessHistory;
		} else {
			$guessHistory.at(-1)!.guess += letter;
			//This line is necessary to trigger a re-render
			$guessHistory = $guessHistory;
		}
	};
</script>

<button on:click={handleClick} class={colorKey[colorCode]}>{letter}</button>

<style>
	button {
		background-color: rgb(152, 152, 152);
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		border-radius: 4px;
		height: 58px;
		cursor: pointer;
		border: none;
		font-family: 'Nanum Pen Script', cursive;
		font-size: 22px;
		text-transform: uppercase;
		user-select: none;
	}
	.dark {
		background-color: rgb(49, 49, 49);
	}
	.yellow {
		background-color: rgb(253, 178, 88);
	}
	.green {
		background-color: rgb(84, 183, 42);
	}
</style>
