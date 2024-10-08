<script lang="ts">
  import type { NoteType } from "$lib/Interfaces";
  import { onMount } from "svelte";
  export let note: NoteType
  const themeColors = ['yellow', 'blue', 'red', 'green'];
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  let _data: HTMLInputElement;
  onMount(() => {
    _data = document.querySelector("input[name=data]") as HTMLInputElement;
})
</script>

<div class="flex flex-col gap-2 w-full p-5">
  <div>
    <select name="theme" class="border text-slate-300 bg-slate-900 rounded px-2 py-1 cursor-pointer" on:change={({target}) => note.theme = target.value}> 
      {#each themeColors as color}
        <option value={color} selected={note.theme === color}>{capitalize(color)}</option>
      {/each}
    </select>
  </div>
  <label>
    <input type="checkbox" name="expanded" on:change={() => note.view_extended = !note.view_extended}>
    <span>Expanded</span>
  </label>
  <input type="text" name="data" placeholder="Start typing" value={note.data} class="bg-transparent text-xl py-5 text-slate-200" on:keyup={() => note.data = _data.value}>
</div>