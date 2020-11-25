<template>
    <section class="section possibilities" id="possibilities">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-12">
                    <h2 
                        class="section__title possibilities__title _dark-back" 
                        v-bind:data-title="possibilities.title">
                        {{ possibilities.title }}
                    </h2>
                    <Slick
                        :options="settings"
                        class="possibilities-slider"
                        v-if="possibilities.items!=undefined && possibilities.items.length > 0"
                        >
                        <div v-for="(item,i) in possibilities.items" :key="i" class="possibilities-slider-slide">
                            <div class="possibilities-slider-slide__wrapper">
                                <img :src="'/images/' + item.img" class="possibilities-slider-slide__image" alt="">
                                <div class="possibilities-slider-slide__title">{{ item.title }}</div>
                                <div class="possibilities-slider-slide__text" v-html="item.text"></div>
                                <button class="possibilities-slider-slide__button button _border">Подробнее</button>
                            </div>
                            
                        </div>
                    </Slick>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Possibilities from '@/assets/data.json'
import Slick from 'vue-slick';

export default {
    data() {
        return {
            possibilities: Possibilities.possibilities,
            settings: {
                arrows: false,
                dots: false,
                fade: false,
                slidesToShow: 3,
                focusOnSelect: true

            },
        }
    },
    components: {
        Slick
    }
}
</script>

<style src="./Possibilities.sass" lang="sass"></style>