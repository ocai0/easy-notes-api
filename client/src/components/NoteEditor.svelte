<script lang="ts">
  import type { NoteType } from "$lib/Interfaces";
  import { onMount } from "svelte";
  import { deleteNote, createNote, updateNote } from "$lib/NoteEndpoints";
  import { COLOR_SCHEME } from '$lib/constants';

  const CREATE_MODE = 1;
  const EDIT_MODE = 2;
  export let mode = CREATE_MODE;
  export let note: NoteType = {
    theme: 'yellow',
    data: '',
    view_extended: false,
    type: 0
  }

  const themeColors = ['yellow', 'blue', 'red', 'green'];
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  let edit: { theme?: HTMLSelectElement; data?: HTMLDivElement; expanded?: HTMLInputElement} = {};
  
  onMount(() => {
    if(!note.view_extended) note.view_extended = false;
    edit.expanded!.checked = note.view_extended as boolean;
    edit.data!.textContent = note.data;
})
</script>

<div class="flex flex-col sm:flex-row gap-3 w-full">
  <div class="sm:order-2 w-full sm:w-2/5">
    <div class="rounded-lg bg-slate-800 text-white flex flex-col gap-5 p-4">
      <label class="w-full">
        <small class="text-slate-400 mb-2 inline-block">Note Color</small>
        <select bind:this={edit.theme} name="theme" class="border border-gray-600 text-slate-300 bg-gray-700 w-full rounded px-2 py-1 cursor-pointer" on:change={() => note.theme = edit.theme.value}> 
          {#each themeColors as color}
            <option value={color} selected={note.theme === color}>{capitalize(color)}</option>
          {/each}
        </select>
      </label>
      <label class="inline-flex items-center cursor-pointer w-full flex justify-between">
        <span class="me-3 text-sm font-medium text-gray-900 dark:text-gray-300">Expanded</span>
        <input type="checkbox" bind:this={edit.expanded} class="sr-only peer" on:change={() => note.view_extended = edit.expanded.checked}>
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
      </label>
      <div class="flex items-end justify-end gap-2">
        {#if mode == EDIT_MODE}
            <button class="p-2 flex items-center justify-center bg-transparent hover:bg-red-700 transition rounded-full" on:click={() => note.uuid && deleteNote(note.uuid)}>
              <span class="material-symbols-sharp"> delete </span>
            </button>
            <button class="p-2 flex items-center justify-center bg-transparent hover:bg-cyan-700 transition rounded-full" on:click={() => note.uuid && updateNote(note, note.uuid)}>
              <span class="material-symbols-sharp"> save </span>
            </button> 
        {/if}
        {#if mode == CREATE_MODE}
            <button class="p-2 flex items-center justify-center bg-slate-700 hover:bg-cyan-600 transition rounded-full" on:click={() => createNote(note)}>
              <span class="material-symbols-sharp"> save </span>
            </button>
        {/if}
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-2 w-full sm:w-3/5">
    <div bind:this={edit.data} contenteditable="true" class={`${COLOR_SCHEME[note.theme]} text-pretty focus:ring focus:outline-none focus:border-cyan-800 p-5 flex flex-col items-start rounded-lg text-xl h-full w-full`} on:keyup={({target}) => note.data = target.textContent}></div>
  </div>
</div>

<style>
  div[contenteditable]:empty::before {
    content: 'Type your note here';
    color: inherit;
    opacity: .5;
    cursor: text;
  }
</style>