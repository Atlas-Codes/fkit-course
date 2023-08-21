<script lang="ts">
    import { auth, userData, user } from '$lib/firebase';
    import "../app.css";

    $user;
    $userData;
</script>

<div class="min-h-screen flex flex-col">
    <slot />
</div>
