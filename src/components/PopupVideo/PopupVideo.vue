<template>
    <div class="popup popup-video" >
        <div class="popup-back-closer" @click="$emit('close')"></div>
        <div class="popup-content popup-video__content" >
            <button @click="$emit('close')" class="popup-closer"></button>
            <iframe width="560" height="315" style="max-width: 100%;margin:auto;display:block" :src='videoSrc' frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        videoSrc: String
    }
}
</script>

<style src="./PopupVideo.sass" lang="sass"></style>