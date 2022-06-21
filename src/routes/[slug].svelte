<script lang="ts" context="module">
	// import type {Load} from '@sveltejs/kit'
	import { createAnswerKey } from '$lib/functions/createAnswerKey';
	import { answerKey, babyDetails } from '$lib/stores/stores';
	import { supabase } from '../supabase';
	export async function load({ params }) {
		const slug = params.slug;
		const { data, error } = await supabase
			.from('babies')
			.select(
				'babyName, babyMiddle, babyLast, birthday, gender, lbs, message, otherNames, oz, parent1, parent2, weight'
			)
			.eq('slug', slug);
		if (error) {
			return {
				error: new Error('Could not find the game')
			};
		}
		const result = data[0];

		answerKey.set(createAnswerKey(result.babyName.toLowerCase()));
		babyDetails.set({ ...result });
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

	let delay = 600;
</script>

<div class="screen">
	<div class="game-area">
		<GuessGrid {delay} />
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
		height: calc(100vh - 160px);
	}
</style>
