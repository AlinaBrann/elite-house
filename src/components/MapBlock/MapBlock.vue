<template>
    <div 
        v-if="coords"
        :class="{ '_active': showMap }"
        class="button button-map _full _border"
        @click="showMap = !showMap"
        >
        <yandex-map 
            class="button-map__map"
            :coords="center" 
            :controls="['zoomControl']" 
            :scrollZoom="false" 
            zoom="16"
            :style="[height ? {'height': + height + 'px' } : {'height': '500px'}]">
            <ymap-marker 
            marker-id="123" 
            :coords="coords"
            :icon="markerIcon"
            
            />
        </yandex-map>
        <span v-if="!showMap">Показать на карте</span>
        <span v-else>Скрыть</span>
    </div>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
    props: {
        coords: {
            required: true
        },
        center: {
            required: true
        },
        height: {
            type: Number
        }
    },
    data() {
        return {
            showMap: false,
            markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: '/images/marker.svg',
                imageSize: [42, 78],
                imageOffset: [0, -40],
                contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            }
        }
    },
    components: {
        yandexMap, 
        ymapMarker
    }
}
</script>

<style src="./MapBlock.sass" lang="sass"></style>