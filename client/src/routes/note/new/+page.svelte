<script lang="ts">
  import "../../../app.css";
  import type { NoteType } from "$lib/Interfaces";
  import NoteEditor from "../../../components/NoteEditor.svelte";
  import { TYPE } from "$lib/constants";
  
  const CREATE_MODE = 1;

  let note: NoteType = {
    data: "",
    theme: "yellow",
    type: TYPE.NOTE,
    view_extended: false,
    parent_folder: '844ca667-83c2-4747-aab9-926d901ae4b9'
  };
</script>
<main class="text-slate-200 bg-slate-900 flex flex-col items-start justify-start h-full">
  <div class="flex items-center justify-between w-full px-5 pt-5">
    <div class="flex gap-2">
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-slate-700 transition rounded-full" on:click={() => history.back()}>
        <span class="material-symbols-sharp"> arrow_back </span>
      </button> 
    </div>
  </div>
  <div class="p-5 w-full">
    <NoteEditor note={note} mode={CREATE_MODE}/>
  </div>
</main>