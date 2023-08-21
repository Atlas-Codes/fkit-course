<script>
    import { auth, db } from "$lib/firebase";
    import { signOut } from "firebase/auth";
</script>

<nav class="bg-base-300 p-4 text-white">
    <div class="container mx-auto">
        <h1 class="text-2xl font-bold">Churn</h1>
        <button class="btn btn-sm btn-warning" on:click={() => signOut(auth)}>Logout</button>
    </div>
</nav>

<div class="container mx-auto mt-4 p-4">
    <slot></slot>
</div>
