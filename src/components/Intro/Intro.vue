<template>
    <section class="intro">
        <div class="intro__top-banner" id="topBanner">
            {{ free }} свободных помещений в Бишкеке →
        </div>
        <div class="intro-video">
            <iframe
            src="https://www.youtube.com/embed/S0zAVyfXSYA?autoplay=1&mute=1&enablejsapi=1&controls=0&fs=0&loop=1&modestbranding=1&start=20"
            frameborder="0" allowfullscreen>
            </iframe>
        </div>
       
        <div class="intro-content">
            <Header 
                @open-booking="openBookingPopup"
                @open-proposal="openProposalPopup"
                @round-position="roundPosition"
                @open-feedback="openFeedbackPopup"
                @open-special="openSpecialPopup" />

            <div class="container">
                <h1 class="intro__title">{{ item.title }}</h1>
                <div class="intro__subtitle">{{ item.subTitle }}</div>
                <button class="button" @click="$emit('open-proposal');$emit('round-position', $event);">индивидуальное предложение </button>
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
                    @click="videoPopup = true; roundPosition($event);"
                >
                    <span class="intro-video-toggle__background"></span>
                </button>

            </div>
        </div>
        <div class="popup" :class="{ '_showPopup': videoPopup, '_hidePopup': !videoPopup }">

            <div class="popup-content" v-if="videoPopup" >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/S0zAVyfXSYA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
        openBookingPopup(item) {
            this.$emit('open-booking', item)
        },
        openFeedbackPopup() {
            this.$emit('open-feedback')
        },
        openProposalPopup() {
            this.$emit('round-roposal')
        },
        roundPosition(event) {
            this.$emit('round-position', event)

        },
        openSpecialPopup() {
				this.$emit('open-special')
			},
    
    }
}
</script>

<style src="./Intro.sass" lang="sass"></style>