<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	let modalStore = getModalStore();

	// Form Data
	const formData = {
		bankName: 'NAB',
		dateLastCancelled: '01/07/2023',
		dateEligible: '01/07/2024',
		spendRequirement: '$3000',
		timeframeForSpend: '90 Days',
		notes: 'Some notes',
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore.length && $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Bank Name</span>
				<input class="input" type="text" bind:value={formData.bankName} placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Date Last Cancelled</span>
				<input class="input" type="text" bind:value={formData.dateLastCancelled} placeholder="Enter date..." />
			</label>
			<label class="label">
				<span>Date Eligible</span>
				<input class="input" type="text" bind:value={formData.dateEligible} placeholder="Enter date..." />
			</label>
			<label class="label">
				<span>Spend Requirement</span>
				<input class="input" type="text" bind:value={formData.spendRequirement} placeholder="Enter amount..." />
			</label>
			<label class="label">
				<span>Timeframe For Spend</span>
				<input class="input" type="text" bind:value={formData.timeframeForSpend} placeholder="Enter text..." />
			</label>
			<label class="label">
				<span>Notes</span>
				<input class="input" type="text" bind:value={formData.notes} placeholder="Enter text..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
	</div>
{/if}