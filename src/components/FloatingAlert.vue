<template>
    <div id="floatingdiv" > 
        {{ state }}
    </div>    
</template>

<script>
export default {
    name: "FloatingAlert",
    props: ["state","message"]
}
</script>

<style scoped>
    #floatingdiv {
        left: 0;
        position: fixed;
        text-align: center;
        bottom: 0;
        width: 100%;
    }    
</style>