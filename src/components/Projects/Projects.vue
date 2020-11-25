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
                                <button class="projects-slider-slide__button button _border" @click="openModal(item)">Подробнее</button>
                            </div>
                        </div>
                    </div>
                </Slick>
            </div>
        </div>
        <div 
            class="popup projects-popup _dark" 
            :class="{ '_showPopup': modalVisible, '_hidePopup': !modalVisible }"
            >
            <div class="popup-content" >
                <div class="popup-body">
                    <button @click="modalVisible = false" class="popup-closer"></button>
                    <div class="popup__title">{{ popupTitle }}</div>
                    <p>{{ popupAddress }}</p>
                    <p>{{ delivery }}</p>
                    <Slick
                        :options="forSettings"
                        class="preview-slider projects-popup-slider _for"
                        v-if="popupGallery!=undefined && popupGallery.length > 0"
                        >
                        <div v-for="image in popupGallery" :key="image.id">
                            <img :src="'/images/' + image.img" >
                        </div>
                    </Slick>
                    <Slick
                        :options="navSettings"
                        class="preview-slider projects-popup-slider _nav"
                        v-if="popupGallery!=undefined && popupGallery.length > 0">
                        <div v-for="image in popupGallery" :key="image.id" class="preview-slider__image">
                            <img :src="'/images/' + image.img" >
                        </div>
                    </Slick>
                    <div class="projects-popup__small-title">О компликсе</div>
                    <div class="projects-popup__text" v-html="aboutText"></div>

                    <MapBlock :coords="coords" :center="[42.880534, 74.616267]"/>

                    <div v-if="infrastructure">
                        <div class="projects-popup__small-title">Инфраструктра</div>
                        <ul class="projects-popup-list _v1">
                            <li 
                                class="projects-popup-list__item" 
                                v-for="list in infrastructure"
                                :key="list"
                                >
                                {{ list }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="advantage">
                        <div class="projects-popup__small-title">Приемущества</div>
                        <ul class="projects-popup-list">
                            <li 
                                class="projects-popup-list__item _v2" 
                                v-for="list in advantage"
                                :key="list"
                            >
                                {{ list }}
                            </li>
                        </ul>
                    </div>
                    <button class="button projects-popup__button">Посмотреть планировки</button>
                </div>
            </div>
        </div>	
    </section>
</template>

<script>
import Projects from '@/assets/data.json'
import Slick from 'vue-slick';
import $ from 'jquery'
import MapBlock from '@/components/MapBlock/MapBlock'



export default {

    data() {
        return {
            projects: Projects.projects,
            showMap: false,
            modalVisible: false,
            modalData: null,
            popupTitle: '',
            popupAddress: '',
            popupGallery: '',
            aboutText: '',
            infrastructure: '',
            advantage: '',
            delivery: '',
            coords: '',
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
            forSettings: {
                arrows: false,
                dots: false,
                fade: true,
                focusOnSelect: true,
                asNavFor: '._nav'
                
            },
            navSettings: {
                arrows: false,
                dots: false,
                focusOnSelect: true,
                slidesToShow: 5,
                asNavFor: '._for'
            }
        }
    },
    components: {
        Slick,
        MapBlock
    },
    methods: {
        handleBeforeChange(event, slick, currentSlide) {
            $('.projects-slider .slick-slide[data-slick-index="' + currentSlide + '"]').addClass('closed');
        },
        handleAfterChange(event, slick, currentSlide) {
            let prev = currentSlide - 1
            $('.projects-slider .slick-slide[data-slick-index="' + prev + '"]').removeClass('closed');
        },
        openModal(item) {
            this.popupTitle = item.name,
            this.popupAddress = item.address,
            this.popupGallery = item.gallery,
            this.delivery = item.delivery,
            this.coords = item.coords,
            this.aboutText = item.text,
            this.infrastructure = item.infrastructure,
            this.advantage = item.advantage,
            this.modalVisible = true
        },
    }
}
</script>

<style src="./Projects.sass" lang="sass"></style>