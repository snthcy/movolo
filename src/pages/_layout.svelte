<script>
    import NavLinks from "./_components/NavLinks.svelte";
</script>

<link rel="stylesheet" href="/css/index.css" />

<div class="nav">
    <NavLinks />
</div>
<div class="main">
    <div class="header">
        <a href="https://github.com/lem6ns/Movolo"><h1>Movolo</h1></a>
        <br><br>
        <a href="https://themoviedb.org"><span>powered by ㅤ <img src="/img/tmdb.svg" alt="TMDB Logo" width="128"/></span></a>
        <br><br><hr><br>
        </div>
    <slot />
</div>
