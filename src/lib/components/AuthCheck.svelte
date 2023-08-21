<script lang="ts">
    import { auth } from '$lib/firebase';
    import { userStore } from 'sveltefire';
    const user = userStore(auth);
  </script>
  
  {#if $user}
    <slot />
  {:else}
      <p class="text-error my-10">
          You must be signed in to view this page.
          <a class="btn btn-primary" href="/login">Sign in</a>
      </p>
  {/if}