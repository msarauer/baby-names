<script lang="ts">
	import Login from './Login.svelte';
	import Signup from './Signup.svelte';
	import { newUser } from '$lib/stores/authStore';
</script>

{#if $newUser}
	<Signup />
{:else}
	<Login />
{/if}
