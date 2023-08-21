<script lang="ts">
    import { auth, user, userCardDataStore } from "$lib/firebase";

    let cardData;

    if ($user) {
        const cardDataStore = userCardDataStore($user.uid);
        cardDataStore.subscribe(value => cardData = value);
    }
</script>
  
Hello {$user?.displayName}

<h2 class="text-2xl mb-4">Manage Your Cards</h2>

<table class="mt-4 w-full">
    <thead>
        <tr>
            <th>Bank Name</th>
            <th>Date Last Cancelled</th>
            <th>Date Eligible</th>
            <th>Spend Requirement</th>
            <th>Timeframe for Spend</th>
            <th>Notes</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{cardData?.bankName}</td>
            <td>{cardData?.dateLastCancelled}</td>
            <td>{cardData?.dateEligible}</td>
            <td>{cardData?.spendRequirement}</td>
            <td>{cardData?.timeframeForSpend}</td>
            <td>{cardData?.notes}</td>
            <td>
                <!-- <button on:click={() => updateCard(card.id)}>Edit</button>
                <button on:click={() => deleteCard(card.id)}>Delete</button> -->
            </td>
        </tr>
    </tbody>
</table>



<!-- <table class="mt-4 w-full">
    <thead>
        <tr>
            <th>Bank Name</th>
            <th>Date Last Cancelled</th>
            <th>Date Eligible</th>
            <th>Spend Requirement</th>
            <th>Timeframe for Spend</th>
            <th>Notes</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each cards as card}
            <tr>
                <td>{card.bankName}</td>
                <td>{card.dateLastCancelled}</td>
                <td>{card.dateEligible}</td>
                <td>{card.spendRequirement}</td>
                <td>{card.timeframeForSpend}</td>
                <td>{card.notes}</td>
                <td>
                    <button on:click={() => updateCard(card.id)}>Edit</button>
                    <button on:click={() => deleteCard(card.id)}>Delete</button>
                </td>
            </tr>
        {/each}
    </tbody>
</table> -->
