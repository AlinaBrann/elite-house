<template>
    <section class="section projects" id="projects">
        <div class="projects-row">
            <div class="projects-content">
                <h2 
                    class="section__title projects-content__title _white" 
                    v-bind:data-title="projects.title">
                    {{ projects.title }}
                </h2>
                <div class="projects-content__text" v-html="projects.text"></div>
            </div>
            <div class="projects-slider-wrapper">
                <Slick
                    :options="settings"
                    @beforeChange="handleBeforeChange"
                    @afterChange="handleAfterChange"
                    class="projects-slider"
                    v-if="projects.slider!=undefined && projects.slider.length > 0"
                >
                    <div v-for="(item,i) in projects.slider" :key="i" class="projects-slider-slide">
                        <div class="projects-slider-slide__wrapper">
                            <img :src="'/images/' + item.img" >
                            <div class="projects-slider-slide__content">
                                <div class="projects-slider-slide__title">{{ item.name }}</div>
                                <div class="projects-slider-slide__address">{{ item.address }}</div>
                                <button class="projects-slider-slide__button button _border">Подробнее</button>
                            </div>
                        </div>
                        
                    </div>
                </Slick>
            </div>
        </div>
    </section>
</template>

<script>
import Projects from '@/assets/data.json'
import Slick from 'vue-slick';
import $ from 'jquery'

export default {
    data() {
        return {
            projects: Projects.projects,
            settings: {
                arrows: true,
                dots: false,
                fade: false,
                speed: 900,
                slidesToShow: 2,
                focusOnSelect: true,
                centerMode: false,
                prevArrow:"<button class='button-arrow _prev _white'><svg width='17' height='16' viewBox='0 0 17 16' fill='none'><path d='M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z'/></svg></button>",
                nextArrow:"<button class='button-arrow _next _white'><svg width='17' height='16' viewBox='0 0 17 16' fill='none'><path d='M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z'/></svg></button>"

            },
        }
    },
    components: {
        Slick
    },
    methods: {
        handleBeforeChange(event, slick, currentSlide) {
            $('.projects-slider .slick-slide[data-slick-index="' + currentSlide + '"]').addClass('closed');
        },
        handleAfterChange(event, slick, currentSlide) {
            let prev = currentSlide - 1
            $('.projects-slider .slick-slide[data-slick-index="' + prev + '"]').removeClass('closed');
        },
    }
}
</script>

<style src="./Projects.sass" lang="sass"></style>