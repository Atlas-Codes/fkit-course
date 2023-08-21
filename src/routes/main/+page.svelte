<script lang="ts">
    import { auth, user, userCardDataStore } from "$lib/firebase";
    import { Table, tableMapperValues, getModalStore } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { onDestroy } from "svelte";
    import type { ModalSettings } from "@skeletonlabs/skeleton";
    
    let cardData: Array<{ [key: string]: any }> = [];
    let previousUid: string | null = null;
    let unsubscribe: () => void;

    let modalStore = getModalStore();
                                        
    $: {
        if ($user && $user.uid !== previousUid) {
            const cardDataStore = userCardDataStore($user.uid);
            unsubscribe = cardDataStore.subscribe(value => {
                cardData = value;
            });
            previousUid = $user.uid;
        }
    }

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
    
    const tableSimple: TableSource = {
        // A list of heading labels.
        head: ['Bank Name', 'Date Last Cancelled', 'Date Eligible', 'Spend Requirement', 'Timeframe for Spend', 'Notes', 'Actions'],
        // The data visibly shown in your table body UI.
        body: tableMapperValues(cardData, ['Bank Name', 'Date Last Cancelled', 'Date Eligible', 'Spend Requirement', 'Timeframe for Spend', 'Notes', 'Actions']),
    };

    $: {
        if (cardData) {
            tableSimple.body = tableMapperValues([cardData], ['bankName', 'dateLastCancelled', 'dateEligible', 'spendRequirement', 'timeframeForSpend', 'notes']);
        }
    }
    
    function editCard() {
        const modal: ModalSettings = {
            type: 'component',
            // Pass the component registry key as a string:
            component: 'ModalForm',
            title: 'Edit',
            body: '',
        };
        modalStore.trigger(modal);
    }
</script>
  
Hello {$user?.displayName}

<h2 class="text-2xl mb-4">Manage Your Cards</h2>

<button class="btn variant-filled" on:click={editCard}>Edit Card</button>

<Table source={tableSimple} />
