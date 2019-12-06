<template>
        <li class="list-group-item list-group-item-primary">  {{ title }} </li>
</template>

<script>
    export default {
        props: ["title"], //Dont put key, it doesnt work!
        name: "List"
    }
</script>

<style scoped>
</style>