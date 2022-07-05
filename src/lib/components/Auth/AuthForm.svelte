<script lang="ts">
	export let handleSubmit;
	export let email;
	export let password;
	export let loading;
	export let buttonText;
</script>

<form class="form-control text-2xl max-w-xl m-auto" on:submit|preventDefault={handleSubmit}>
	<div>
		<label class="label" for="email">Email</label>
		<input
			class="w-full px-2 rounded-none border-2 border-secondary bg-transparent"
			name="email"
			type="email"
			bind:value={email}
		/>
	</div>
	<div>
		<label class="label" for="password">Password</label>
		<input
			class="w-full px-2 rounded-none border-2 border-secondary bg-transparent"
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
</form>
