<script lang="ts">
  import "../../../app.css";
  import type { NoteType } from "$lib/Interfaces";
  import { createNote, deleteNote } from "$lib/NoteEndpoints";
  import { page } from "$app/stores";
  import NoteEditor from "../../../components/NoteEditor.svelte";
  import { TYPE } from "$lib/constants";

  let note: NoteType = {
    data: "",
    theme: "yellow",
    type: TYPE.NOTE,
    view_extended: false,
    parent_folder: '844ca667-83c2-4747-aab9-926d901ae4b9'
  };
</script>
<main class="text-slate-200 bg-slate-900 flex flex-col items-start justify-start h-full">
  <div class="flex items-center justify-between w-full p-5">
    <div class="flex gap-2">
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-slate-700 transition rounded-full" on:click={() => history.back()}>
        <span class="material-symbols-sharp"> arrow_back </span>
      </button> 
    </div>
    <div class="flex gap-2">
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-red-700 transition rounded-full" on:click={() => note.uuid && deleteNote(note.uuid)}>
        <span class="material-symbols-sharp"> delete </span>
      </button>
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-cyan-700 transition rounded-full" on:click={() => createNote(note)}>
        <span class="material-symbols-sharp"> save </span>
      </button> 
    </div>
  </div>
  <NoteEditor note={note} />
</main>