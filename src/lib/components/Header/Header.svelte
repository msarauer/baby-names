<script lang="ts">
	import { gameOver, openModal } from '$lib/stores/stores';
	import GiChest from 'svelte-icons/gi/GiChest.svelte';
	import { user, newUser } from '$lib/stores/authStore';
	import { supabase } from '../../../supabase.js';
	import { page } from '$app/stores';

	const handleLogout = () => {
		supabase.auth.signOut();
	};
</script>

<header>
	<div class="navbar bg-base-100 border-b">
		<div class="navbar-start">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/></svg
					>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a>Homepage</a></li>
					<li><a>Portfolio</a></li>
					<li><a>About</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<h1 class="text-3xl">BABIDLE</h1>
		</div>
		<div class="navbar-end">
			{#if $page.url.pathname === '/'}
				{#if $user}
					<button class="btn btn-ghost z-10" on:click={handleLogout}> Logout </button>
				{:else if $newUser}
					<button
						class="btn btn-ghost z-10"
						on:click={() => {
							$newUser = false;
						}}
					>
						Login
					</button>
				{:else}
					<button
						class="btn btn-ghost z-10"
						on:click={() => {
							$newUser = true;
						}}
					>
						Sign up
					</button>
				{/if}
			{:else if $gameOver}
				<button
					class="btn btn-ghost btn-circle z-10"
					on:click={() => {
						$openModal.success = true;
					}}
				>
					<GiChest />
				</button>
			{/if}
			<button class="btn btn-ghost btn-circle">
				<div class="indicator">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/></svg
					>
					<span class="badge badge-xs badge-primary indicator-item" />
				</div>
			</button>
		</div>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		border-bottom: 1px solid white;
		margin-bottom: 1em;
		font-family: 'Cabin Sketch', cursive;
		font-weight: 700;
		color: var(--girl-color);
	}
</style>
