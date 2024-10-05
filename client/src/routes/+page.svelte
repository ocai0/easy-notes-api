<script lang="ts">
  import { TYPE } from "$lib/constants";
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

<main class="text-slate-200 bg-slate-900 flex flex-col items-start justify-start h-full">
  <div class="p-5 self-end fixed bottom-0">
    <a href="/note/new" class="p-2 flex items-center justify-center bg-slate-600 hover:bg-cyan-700 transition rounded-full">
      <span class="material-symbols-sharp"> add </span>
    </a>
  </div>
  {#if !items.length}
    <div class="h-full w-full flex items-center justify-center p-5">
      <small class="text-slate-500 text-md">No notes to view</small>
    </div>
  {:else}
    <section class="masonry container mx-auto pt-9">
      {#each items as item}
        {#if item.type == TYPE.NOTE}
            <Note note={item} />
        {/if}
        {#if item.type == TYPE.FOLDER}
          <!-- <Note data={data} theme={theme} /> -->
        {/if}
      {/each}
    </section>
  {/if}
</main>
