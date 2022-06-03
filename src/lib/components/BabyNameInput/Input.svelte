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
	<input class="input" {name} bind:value={fields[name]} />
	{#if name in Object.keys(errors)}
		<div class="text-error ">{errors[name]}</div>
	{/if}
</div>
