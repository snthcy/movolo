<script>
  import { url, isActive } from "@roxi/routify";
  let show = false;
  const _links = [
    ["./index", "Home"],
    ["./search", "Search"],
    ["./donate", "Donate"],
    ["./about", "About"],
  ];
</script>

<aside>
  <nav class:show on:click={() => (show = false)}>
    {#each _links as [path, name]}
      <a class="link" class:active={$isActive(path)} href={$url(path)}>
        {name}
      </a>
    {/each}
  </nav>
</aside>

<style>
  aside {
    text-align: center;
  }

  nav {
    background: #0f0f0f;
    width: 100%;
    padding: 16px;
    z-index: 1;
    margin: 16px;
    border-radius: 4px;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.075);
    display: inline-block;
    position: relative;
    width: auto;
  }

  .link {
    padding: 0 16px;
    min-width: 56px;
    display: inline-block;
    color: white;
    text-decoration: none;
  }

  .active {
    font-weight: bold;
  }
</style>
