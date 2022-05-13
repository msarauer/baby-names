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
</script>

<div class="screen">
	<div class="game-area">
		<GuessGrid />
	</div>
	<div class="keyboard-container">
		<Keyboard />
	</div>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		max-height: fit-content;
	}
	.game-area {
		max-width: 100%;
	}
	.keyboard-container {
		max-width: 100%;
	}
</style>
