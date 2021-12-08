<script>
    import { goto } from '@roxi/routify';
    import View from "../_components/View.svelte";
    let query = "";
</script>

<input type="text" placeholder="search" bind:value={query} on:input={() => $goto(`/search/${query}`)} />

<View results={[]}></View>
