<script lang="ts">
  import "../../../app.css";
  import { onMount } from "svelte";
  import type { NoteType } from "$lib/Interfaces";
  import { getNoteById } from "$lib/NoteEndpoints";
  import { page } from "$app/stores";
  import ErrorPage from "../../../components/ErrorPage.svelte";
  import NoteEditor from "../../../components/NoteEditor.svelte";

  const { uuid } = $page.params;
  let note: NoteType;
  let loaded = false
  let showError = false;
  const EDIT_MODE = 2;
  onMount(async () => {
    try {
      note = await getNoteById(uuid);
      loaded=true
    }
    catch(error) {
      showError = true
      loaded=true
    }
  });
</script>
{#if loaded}
  {#if showError}
    <ErrorPage />
  {:else}
    <main class="text-slate-200 bg-slate-900 flex flex-col items-start justify-start h-full">
      <div class="flex items-center justify-between w-full px-5 pt-5">
        <div class="flex gap-2">
          <button class="p-2 flex items-center justify-center bg-transparent hover:bg-slate-700 transition rounded-full" on:click={() => history.back()}>
            <span class="material-symbols-sharp"> arrow_back </span>
          </button> 
        </div>
      </div>
      <div class="p-5 w-full">
        <NoteEditor note={note} mode={EDIT_MODE}/>
      </div>
    </main>
  {/if}
{/if}
