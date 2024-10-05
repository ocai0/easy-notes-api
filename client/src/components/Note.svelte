<script lang="ts">
  import type { NoteType, IColorScheme } from '$lib/Interfaces';
  export let note: NoteType;
  const noteStyling = `py-3 px-5 rounded-md flex items-center`
  const COLOR_SCHEME: IColorScheme = {
    yellow: `bg-amber-700 text-yellow-50`,
    red: `bg-red-700 text-red-50`,
    green: `bg-teal-500 text-teal-50`,
    blue: `bg-indigo-500 text-indigo-50`,
  }
  const {theme, data, extended} = note;
  console.log({note})
</script>

<div class={`item ${noteStyling} ${COLOR_SCHEME[theme]} ${extended && 'expanded'}`}>
  <span class="pt-5 text-xl">{data}</span>
</div>