<template>
    <li>
        <div class="catalog-item__container">
            <div class="catalog-item__row">
                <div class="catalog-item__slider">
                    <Slick
                        :options="settings"
                        :class="'preview-slider _for for_' + item.id"
                        v-if="item.gallery!=undefined && item.gallery.length > 0"
                    >
                        <div v-for="(image, index) in item.gallery" :key="index">
                            <img :src="'/images/' + image.img" @click="$emit('open-gallery', item, index);">
                        </div>
                    </Slick>
                    <Slick
                        :options="navSettings"
                        :class="'preview-slider _nav nav_' + item.id"
                        v-if="item.gallery!=undefined && item.gallery.length > 0">
                        <div v-for="image in item.gallery" :key="image.id">
                            <img :src="'/images/' + image.img" >
                        </div>
                    </Slick>
                </div>
                <div class="catalog-item__layout">
                    <img 
                        v-if="item.layout"
                        :src="/images/ + item.layout"
                        :alt="item.title"
                    >
                </div>
                    
                <div class="catalog-item__content">
                    <div class="catalog-item__area">{{ item.area }} m<sup>2</sup></div>
                    <div class="catalog-item__address" v-html="item.address"></div>
                    
                    <button class="catalog-item__button button _full" @click="$emit('open-booking', item)">ЗАБРОНИРОВАТЬ</button>
                    <button 
                        class="catalog-item__button button _full _border"
                        @click="$emit('open-special', item);"
                    >Спец. предложение</button>
                    <button class="button-more catalog-item__all-info" @click="goTodetail(item.id)">Подробное описание</button>
                </div>                    
            </div>
            
        </div>
       
    </li>
   
</template>

<script>
import Slick from 'vue-slick';


export default {
    data () {
        return {
            title:"details",
            settings: {
                arrows: false,
                dots: false,
                fade: true,
                focusOnSelect: true,
                asNavFor: '.nav_' + this.item.id
            },
            navSettings: {
                arrows: true,
                dots: false,
                focusOnSelect: true,
                slidesToShow: 2,
                asNavFor: '.for_' + this.item.id,
                responsive: [
                    {
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 548,
                        settings: {
                            slidesToShow: 2
                        }
                    }
                ]
            }
        }
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        booking: String
    },
    components: {
        Slick
    },
    methods: {
        goTodetail(prodId) {
            this.$router.push({name:'CatalogItemDetails',params:{Pid:prodId}})
        }
    }
}
</script>

<style src="./CatalogItem.sass" lang="sass"></style>