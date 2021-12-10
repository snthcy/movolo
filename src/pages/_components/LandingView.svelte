<script>
    import LandingCard from "./LandingCard.svelte";
    export let results = [];
    console.log(results)
    export let media_type = '';
</script>

<svelte:head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap");
        input {
            text-align: center;
            background-color: #0f0f0f;
            color: white;
            border: 4px solid #0f0f0f;
            border-radius: 5px;
        }
    </style>
</svelte:head>

<main>
    {#each results as film}
        <LandingCard {film} {media_type} />
    {/each}
</main>

<style>
    main {
        margin: 13vw;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
        justify-items: flex-start;
        justify-content: center;

        padding: 14px;
        background-color: #0f0f0f;
        border-radius: 5px;
        box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
