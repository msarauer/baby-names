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

<div class="game-area">
	<GuessGrid />
	<Keyboard />
</div>

<style>
	.game-area {
		max-width: 100vw;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
