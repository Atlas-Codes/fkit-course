<script>
  import { auth, userData, user } from '$lib/firebase';

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      } catch (error) {
        console.error("Error during Google login:", error);
      }
  }

  </script>
  
  <svelte:head>
    <title>Churn - Maximize Your Rewards</title>
    <meta name="description" content="Keep track of credit card bonuses and optimize your rewards!" />
  </svelte:head>
  
  <main class="flex w-full min-h-screen">
  
    <div class="hero bg-base-200">
      <div class="hero-content text-center"> 
        <div class="w-full">
          <h1 class="text-7xl font-bold">Churn</h1>
          <p class="py-6 text-2xl">Manage your rewards credit cards in one location</p>
          <!-- {#if $userData?.username}
            <a href="/{$userData.username}/edit" class="btn btn-primary">Get Started</a>
          {:else}
            <a href="/login" class="btn btn-primary">Login / Sign Up</a>
          {/if} -->

          {#if $user}
            <h2 class="pb-6 text-2xl">Welcome, {$user.displayName}</h2>
            <a href="/main" class="btn btn-outline btn-accent">Get Started</a>
            <br><br>
            <button class="btn btn-outline btn-warning" on:click={() => signOut(auth)}>Sign out</button>
          {:else}
            <button class="btn btn-outline btn-success" on:click={signInWithGoogle}
              >Sign in with Google</button
            >
          {/if}
        </div>
      </div>
    </div>
    
  </main>
  
  