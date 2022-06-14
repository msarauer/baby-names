<script lang="ts">
	interface obj {
		[key: string]: string;
	}

	export let errors: obj;
	export let fields: obj;
	export let name: string;
	export let label: string;

	console.log('here', fields);
</script>

<div>
	<label class="label" for={name}>{label}</label>
	<input
		class="p-2 border-x-0 border-t-0 rounded-none border-b-2 border-b-secondary bg-transparent focus:outline-none focus:border-b-2 focus:border-b-primary focus:border-l-2 focus:border-l-primary"
		{name}
		bind:value={fields[name]}
	/>
	{#if name in Object.keys(errors)}
		<div class="text-error ">{errors[name]}</div>
	{/if}
</div>
