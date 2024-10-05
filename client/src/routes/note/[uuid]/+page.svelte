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
  onMount(async () => {
    try {
      note = await getNoteById(uuid);
      loaded=true
    }
    catch(error) {
      showError = true
    }
  });
</script>
{#if loaded}
  {#if showError}
    <ErrorPage />
  {:else}
    <NoteEditor note={note}/>
  {/if}
{/if}