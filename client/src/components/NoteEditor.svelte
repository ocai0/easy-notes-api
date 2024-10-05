<script lang="ts">
  import type { NoteType } from "$lib/Interfaces";
  import { updateNote, deleteNote } from "$lib/NoteEndpoints";
  export let note: NoteType
  const themeColors = ['yellow', 'blue', 'red', 'green'];
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
</script>
<main class="text-slate-200 bg-slate-900 flex flex-col items-start justify-start h-full">
  <div class="flex items-center justify-between w-full p-5">
    <div class="flex gap-2">
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-slate-700 transition rounded-full" on:click={() => history.back()}>
        <span class="material-symbols-sharp"> arrow_back </span>
      </button> 
    </div>
    <div class="flex gap-2">
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-red-700 transition rounded-full" on:click={() => deleteNote(note.uuid)}>
        <span class="material-symbols-sharp"> delete </span>
      </button> 
      <button class="p-2 flex items-center justify-center bg-transparent hover:bg-cyan-700 transition rounded-full" on:click={() => updateNote(note, note.uuid)}>
        <span class="material-symbols-sharp"> save </span>
      </button> 
    </div>
  </div>
  <form action="" class="flex flex-col gap-2 w-full p-5">
    <div>
      <select name="theme" class="border text-slate-300 bg-slate-900 rounded px-2 py-1 cursor-pointer">
        {#each themeColors as color}
          <option value={color} selected={note.theme === color}>{capitalize(color)}</option>
        {/each}
      </select>
    </div>
    <input type="text" name="data" placeholder="Start typing" value={note.data} class="bg-transparent text-xl py-5 text-slate-200">
  </form>
</main>