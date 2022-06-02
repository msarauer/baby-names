<script lang="ts">
	export let error: string = '';
	export let field: string;
	export let name: string;
	export let label: string;
</script>

<div>
	<label class="label" for={name}>{label}</label>
	<input class="input" {name} bind:value={field} />
	<div class="text-error ">{error}</div>
</div>
