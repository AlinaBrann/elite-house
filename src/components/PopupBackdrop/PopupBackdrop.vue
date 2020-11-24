<template>
    <div class="popup-backdrop" 
    :style="{
        left: leftPosition + 'px', 
        top: topPosition + 'px',
        transformOrigin: xPos + ' ' + yPos
    }"
    ></div>
</template>

<script>
export default {
    props: {
        leftPosition: {
            type: Number,
            required: true
        },
        topPosition: {
            type: Number,
            required: true
        },
        yPos: {
            type: String,
            required: true
        },
        xPos: {
            type: String,
            required: true
        }
    }
}
</script>