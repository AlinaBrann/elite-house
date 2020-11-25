<template>
    <section class="intro">
        <div class="intro__top-banner">
            {{ free }} свободных помещений в Бишкеке →
        </div>
        <div class="intro-content">

            <Header/>

            <div class="container">
                <h1 class="intro__title">{{ item.title }}</h1>
                <div class="intro__subtitle">{{ item.subTitle }}</div>
                <button class="button" @click="openProposalModal();popupOpener($event);">индивидуальное предложение </button>
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
                    @click="videoPopup = true; popupOpener($event);"
                >
                    <span class="intro-video-toggle__background"></span>
                </button>

            </div>
        </div>
        <div class="popup" :class="{ '_showPopup': videoPopup, '_hidePopup': !videoPopup }">
            <div class="popup-backdrop" 
            :style="{
                left: left + 'px', 
                top: top + 'px',
                transformOrigin: posX + ' ' + posY
            }"
            @click="closePopup()"
            ></div>
            <div class="popup-content" v-if="videoPopup" >
                <iframe width="560" height="315" src="https://www.youtube.com/embed/NsUWXo8M7UA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
        <ProposalModal 
            :leftPos="left"
            :topPos="top"
            :originX="posX"
            :originY="posY"
            v-if="showPopup" 
            :class="{ '_showPopup': showPopup, '_hidePopup': !showPopup }" 
            @close="showPopup = false"
            class="popup-offer"
        />
    </section>
</template>

<script>
import Intro from '@/assets/data.json'
import Slick from 'vue-slick'
import $ from 'jquery'
import Header from '@/components/Header/Header'
import ProposalModal from '@/components/ProposalModal/ProposalModal';


export default {
    data() {
        return {
            item: Intro.intro,
            videoPopup: false,
            isFixed: false,
            showPopup: false,
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
        ProposalModal
    },
    methods: {
        closePopup() {
			return this.videoPopup = false	
        },
    
    }
}
</script>

<style src="./Intro.sass" lang="sass"></style>