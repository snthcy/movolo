<script>
    import Card from "./Card.svelte";
    export let results;
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
        <Card {film} />
    {/each}
</main>

<style>
    main {
        margin: 7.8vw;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 14px;
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
