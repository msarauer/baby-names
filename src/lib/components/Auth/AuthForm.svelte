<script lang="ts">
	import { newUser } from '$lib/stores/authStore';

	export let handleSubmit;
	export let email;
	export let password;
	export let loading: boolean;
	export let buttonText: string;
	export let switchMessage: string;
	export let switchButton: string;
</script>

<form class="form-control text-2xl max-w-xl m-auto" on:submit|preventDefault={handleSubmit}>
	<div class="card bg-primary shadow-lg text-primary-content p-10">
		<div>
			<label class="label" for="email">Email</label>
			<input
				class="w-full bg-white px-2 rounded-none border-2 border-secondary bg-transparent"
				name="email"
				type="email"
				bind:value={email}
			/>
		</div>
		<div>
			<label class="label" for="password">Password</label>
			<input
				class="w-full bg-white px-2 rounded-none border-2 border-secondary bg-transparent"
				name="password"
				type="password"
				bind:value={password}
			/>
		</div>
		<button class="btn btn-secondary my-3 text-2xl">
			{#if loading}
				loading
			{:else}
				{buttonText}
			{/if}
		</button>
	</div>
</form>
<div
	class="text-2xl max-w-xl m-auto card bg-primary shadow-lg text-primary-content p-10 mt-2 flex-row justify-center gap-3 items-center"
>
	{switchMessage}<button
		class="btn btn-link text-primary-content text-xl"
		on:click={() => {
			$newUser = !$newUser;
		}}>{switchButton}</button
	>
</div>
