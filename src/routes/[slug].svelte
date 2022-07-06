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
				'babyName, babyMiddle, babyLast, birthday, gender, lbs, message, oz, weight, profiles ( first_name, partners_name )'
			)
			.eq('slug', slug);
		if (error) {
			console.log(error);
			return {
				error: new Error('Could not find the game')
			};
		}
		console.log('here', data[0]);
		const result = {
			babyName: data[0].babyName,
			babyMiddle: data[0].babyMiddle,
			babyLast: data[0].babyLast,
			birthday: data[0].birthday,
			gender: data[0].gender,
			lbs: data[0].lbs,
			message: data[0].message,
			oz: data[0].oz,
			weight: data[0].weight,
			first_name: data[0].profiles.first_name,
			partners_name: data[0].profiles.partners_name
		};

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
	import GuessGrid from '$lib/components/GuessGrid/GuessGrid.svelte';
	import Keyboard from '$lib/components/Keyboard/Keyboard.svelte';

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
