<script lang="ts">
  import { TYPE } from '$lib/constants'
  import "../app.css";
  import { onMount } from "svelte";
  import type { NoteType, IColorScheme } from "$lib/Interfaces";
  import Note from "../components/Note.svelte";
  import { getQueryParams } from "$lib/Location";
  import { getNotesByPage } from "$lib/NoteEndpoints";
  let items: NoteType[] = [];

  onMount(async () => {
    const queryParams = getQueryParams();
    const result = await getNotesByPage(queryParams);
    items = result.notes;
  });
</script>

<main class="masonry min-w-screen min-h-screen text-slate-200 bg-slate-900 p-5">
  
  {#each items as item}
    {#if item.type == TYPE.NOTE}
      <Note note={item} />
    {/if}
    {#if item.type == TYPE.FOLDER}
      <!-- <Note data={data} theme={theme} /> -->
    {/if}
  {/each}
</main>
