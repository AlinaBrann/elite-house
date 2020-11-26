<template>
    <div class="popup-backdrop" 
    :style="
    [leftPosition ? {'left': + leftPosition + 'px' } : {'left': '10%'},
    topPosition ? {'top': + topPosition + 'px' } : {'top': '10%'},
    xPos && yPos ? {'transformOrigin': + xPos + '%' + ' ' + yPos + '%' } : {'transformOrigin': '50% 50%'}]"
    ></div>
</template>

<script>
export default {
    props: {
        leftPosition: {
            required: true
        },
        topPosition: {
            required: true
        },
        yPos: {
            required: true
        },
        xPos: {
            required: true
        }
    }
}
</script>