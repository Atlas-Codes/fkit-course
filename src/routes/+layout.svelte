<script lang='ts'>
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { auth, userData, user } from '$lib/firebase';
    import "../app.css";

    import { initializeStores, Modal } from '@skeletonlabs/skeleton';
    import type { ModalComponent } from '@skeletonlabs/skeleton';
    import ModalForm from '$lib/components/ModalForm.svelte';
    initializeStores();

    $user;
    $userData;

    const modalComponentRegistry: Record<string, ModalComponent> = {
        ModalForm: {
            // Pass a reference to your custom component
            ref: ModalForm,
            // Add the component properties as key/value pairs
            // props: { background: 'bg-red-500' },
            // Provide a template literal for the default component slot
            // slot: '<p>Skeleton</p>'
        },
    };

</script>

<Modal components={modalComponentRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Churn</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
