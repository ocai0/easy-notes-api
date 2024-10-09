<script lang="ts">
  import type { NoteType } from '$lib/Interfaces';
  import { COLOR_SCHEME } from '$lib/constants';
  export let note: NoteType;
  const noteStyling = `py-3 px-5 rounded-md flex items-center`
  const {theme, data, extended} = note;
</script>

<a href={`\\note\\${note.uuid}`} class={`item ${noteStyling} ${COLOR_SCHEME[theme]} ${extended && 'expanded'}`}>
  <span class="pt-5 text-xl">{data}</span>
</a>