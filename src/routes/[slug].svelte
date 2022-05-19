<script lang="ts" context="module">
	// import type {Load} from '@sveltejs/kit'
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey } from '$lib/stores/stores';
	import { supabase } from '../supabase';
	export async function load({ params }) {
		const slug = params.slug;
		const { data, error } = await supabase.from('babies').select('babyName').eq('slug', slug);
		if (error) {
			return {
				error: new Error('Could not find the game')
			};
		}
		answerKey.set(createAnswerKey(data[0].babyName));
		return {
			props: {
				game: data[0].babyName
			}
		};
	}
</script>

<script lang="ts">
	import GuessGrid from '$lib/components/GuessGrid/index.svelte';
	import Keyboard from '$lib/components/Keyboard/index.svelte';
	import Balloons from '$lib/components/Balloons/index.svelte';

	let delay = 600;
	let showBalloons = false;

	const handleWin = () => {
		showBalloons = true;
	};
</script>

<div class="screen">
	{#if showBalloons}
		<div class="balloons"><Balloons /></div>{/if}
	<div class="game-area">
		<GuessGrid {delay} on:win={handleWin} />
	</div>
	<div class="keyboard-container">
		<Keyboard {delay} />
	</div>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: calc(100vh - 200px);
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
