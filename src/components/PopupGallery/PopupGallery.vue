<template>
    <div 
        class="popup popup-gallery _dark" 
        >
        <div class="popup-back-closer" @click="$emit('close-modal')"></div>
        <div class="popup-back-closer" @click="$emit('close-modal')"></div>
        <div class="popup-content popup-gallery__content" >
            <div class="popup-body popup-gallery__body">
                <button @click="$emit('close-modal')" class="popup-closer"></button>
                <Slick
                    ref="slick"
                    :options="settings"
                    class="preview-slider popup-gallery-slider"
                >
                    <div v-for="item in images" :key="item.id">
                        <img :src="'/images/' + item.img" >
                    </div>
                </Slick>
            </div>
            
        </div>
    </div>	
</template>

<script>
import Content from '@/assets/data.json'
import Slick from 'vue-slick';

export default {
    props: [
        "text",
        "images",
        "title",
        "index"
    ],
    data() {
        return {
            content: Content.PopupSpecial,
            settings: {
                arrows: true,
                dots: false,
                fade: true,
                focusOnSelect: true,
                slickGoTo: 0,
                prevArrow: "<button class='button-arrow _prev _white'><svg width='17' height='16' viewBox='0 0 17 16' fill='none'><path d='M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z'/></svg></button>",
				nextArrow: "<button class='button-arrow _next _white'><svg width='17' height='16' viewBox='0 0 17 16' fill='none'><path d='M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z'/></svg></button>",
            }
        }
    },
    components: {
        Slick
    },
    methods: {

        slickGoTo(index1) 
            { this.$refs["slick"].$el.slick.slickGoTo(parseInt(index1)); }
    },
    watch: {
		images: function () {
			this.$refs.slick.destroy()
			this.$nextTick(() => {
                this.$refs.slick.create()
			})
        },
        index: function () {
            this.slickGoTo(this.index)
			
		}
		
	},
}
</script>

<style src="./PopupGallery.sass" lang="sass"></style>