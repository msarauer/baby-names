<script lang="ts">
	interface obj {
		[key: string]: string;
	}

	export let errors: obj;
	export let fields: obj;
	export let name: string;
	export let label: string;

	console.log(name in Object.keys(errors));
</script>

<div class="">
	<label class="label pb-0" for={name}>{label}</label>
	<input
		class="w-full px-2 rounded-none border-2 border-secondary bg-white"
		{name}
		pattern="[a-zA-Z]+"
		bind:value={fields[name]}
	/>
	{#if errors[name]}
		<div class="text-error">{errors[name]}</div>
	{/if}
</div>
