<script lang="ts">
	import Auth from '$lib/components/Auth/Auth.svelte';
	import Signup from '$lib/components/Auth/Signup.svelte';
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
</script>

<div class="">
	{#if $user}
		<Profile />
		<BabyNameInput />
	{:else}
		<Signup />
		<Auth />
	{/if}
</div>

<style>
</style>
