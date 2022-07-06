<script lang="ts">
	import AuthEntry from '$lib/components/Auth/AuthEntry.svelte';
	import BabyNameInput from '$lib/components/BabyNameInput/Form.svelte';
	import Profile from '$lib/components/Profile/Profile.svelte';
	import { user } from '$lib/stores/authStore';
	import { supabase } from '../supabase.js';

	console.log(supabase.auth.user());
	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
		if (session?.user) {
			console.log('logged in');
		}
	});

	let showBabyInput = false;
</script>

<div class="max-w-xl m-auto">
	{#if $user}
		<Profile bind:showBabyInput />
		{#if showBabyInput}
			<BabyNameInput />
		{/if}
	{:else}
		<AuthEntry />
	{/if}
</div>

<style>
</style>
