<script>
  import "../app.css";
  let notes = [];
  const getNotes = () => {
    return [
      {
        data: "Teste",
        theme: "yellow",
        type: 1
      },
    ]
  }
  notes = getNotes()
</script>

<main class="w-screen h-screen p-3 text-slate-200 bg-slate-900">
  {#each notes as {theme, data, type}}
    <div class={`note ${theme}`}>
      {data}
    </div>
  {/each}
</main>