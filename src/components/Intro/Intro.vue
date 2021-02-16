<template>
    <section class="intro">
        <a href="#catalog" v-smooth-scroll class="intro__top-banner" id="topBanner">
            {{ free }} свободных помещений в Бишкеке →
        </a>
        <div class="intro-video">
            <div class="intro-video-wrapper">
<<<<<<< Updated upstream
               <video width="100%" loop controls autoplay muted>
                <source src="/Elite-House_compress.mp4" >
               
                Элемент video не поддерживается вашим браузером. 
                <a href="video/duel.mp4">Скачайте видео</a>.
=======
               <video loop autoplay muted>
                <source src="/Elite-House_2.mp4" >

                Элемент video не поддерживается вашим браузером.
                <a href="/Elite-House_2.mp4">Скачайте видео</a>.
>>>>>>> Stashed changes
                </video>
                <!-- <iframe src="https://www.youtube.com/embed/gd5k7RWzF4M?autoplay=1&amp;loop=1&amp;enablejsapi=1&amp;&amp;playerapiid=featuredytplayer&amp;controls=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0&amp;color=white&amp;iv_load_policy=3&amp;theme=light&amp;wmode=transparentm&amp;playlist=gd5k7RWzF4M&amp;mute=1" frameborder="0" allow="autoplay" id="widget2" ></iframe> -->
            </div>
            
        </div>
       
        <div class="intro-content">
            <Header 
                @open-booking="openPopupBooking"
                @open-proposal="openPopupProposal"
                @round-position="roundPosition"
                @open-feedback="openPopupFeedback"
                @open-menu="openMenu"
                @close-menu="closeMenu"
                @open-special="openPopupSpecial" />

            <div class="container">
                <h1 class="intro__title">{{ item.title }}</h1>
                <div class="intro__subtitle">{{ item.subTitle }}</div>
                <button class="button" @click="$emit('open-proposal');">получить индивидуальное предложение </button>
                <div class="intro-slider-wrapper">
                    <Slick
                        :options="settings"
                        class="intro-slider _for"
                        v-if="item.slider!=undefined && item.slider.length > 0"
                        >
                        <div v-for="slide in item.slider" :key="slide.title" >
                            <div class="intro-slider__text" :title="slide.title">{{ slide.text }}</div>
                        </div>
                    </Slick>
                </div>
                <button 
                    class="intro-video-toggle" 
                    @click="$emit('open-video');"
                >
                    <span class="intro-video-toggle__background"></span>
                </button>

            </div>
        </div>
        
    </section>
</template>

<script>
import Intro from '@/assets/data.json'
import Slick from 'vue-slick'
import $ from 'jquery'
import Header from '@/components/Header/Header'


export default {
    data() {
        return {
            item: Intro.intro,
            videoPopup: false,
            isFixed: false,
            videoSrc: '',
            scrollPosition: null,
            settings: {
                arrows: false,
                dots: true,
                fade: true,
                autoplay: true,
                focusOnSelect: true,
                dotsClass: "intro-slider-dots",
                customPaging: function(slider, i) { 
                    return '<div class="intro-slider-dots-dot"><span class="intro-slider-dots-dot__text">' + $(slider.$slides[i]).find('.intro-slider__text').attr('title') + '</span></div>';
                },
            }
        }
        
    },
    props: {
        free: {
            type: String
        }
    },
    components: {
        Slick,
        Header,
    },
    methods: {
        closePopup() {
			return this.videoPopup = false	
        },
        openPopupBooking(item) {
            this.$emit('open-booking', item)
        },
        openPopupFeedback() {
            this.$emit('open-feedback')
        },
        openMenu() {
            this.$emit('open-menu')
        },
        closeMenu() {
            this.$emit('close-menu')
        },
        openPopupProposal() {
            this.$emit('round-roposal')
        },
        roundPosition(event) {
            this.$emit('round-position', event)

        },
        openPopupSpecial() {
            this.$emit('open-special')
        },
        openPopupVideo() {
            this.$emit('open-video')
        },
        
    
    }
}
</script>

<style src="./Intro.sass" lang="sass"></style>