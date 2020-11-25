<template>
    <fixed-header :fixed.sync="isFixed" :threshold="40">
        <header class="header" :class="{ 'is-fixed': isFixed, '_dark': darkTheme }">
            <div class="container">
                <div class="header-row">
                    <div class="header-logo-wrapper">
                        <a href="#intro" v-smooth-scroll class="header-logo">
                            <transition-group name="fade">
                                <img 
                                    v-if="darkTheme"
                                    :key="2"
                                    src="/images/logo.png" 
                                    class="header-logo__img" 
                                    alt="">
                                <img 
                                    v-else
                                    transition="fade"
                                    :key="1"
                                    src="/images/logo-white.png" 
                                    class="header-logo__img" 
                                    alt="">
                            </transition-group>
                        </a>
                    </div>
                    
                    <div class="header-menu-wrapper">
                        <ul class="header-menu">
                            <li class="header-menu__item animated-link">
                                Специальные предложения
                            </li>
                            <li class="header-menu__item animated-link">
                                <a href="#catalog" v-smooth-scroll >Выбрать помещения</a>
                            </li>
                        </ul>
                    </div>
                    <div class="header-info-wrapper _jcfe">
                        <a :href="'tel:' + phone" class="header-phone">{{ phone }}</a>
                        <button class="header-button header-phone-toggle button-white"
                            :class="{ '_active': phonePopup }"
                            @click="popupOpener($event); phonePopupOpener(); menuShow = false"
                            >
                            <span class="header-phone-toggle__item"></span>
                            <span class="header-phone-toggle__item"></span>
                        </button>
                        <button 
                            class="header-button header-menu-toggle button-white" 
                            ref="menuButton"
                            :class="{ '_active': menuShow }"
                            @click="popupOpener($event); menuToggle(); phonePopup = false"
                            >
                            <span class="header-menu-toggle__item"></span>
                            <span class="header-menu-toggle__item"></span>
                        </button>      
                        <div class="popup popup-feedback" @open="phonePopup = true" :class="{ '_showPopup': phonePopup, '_hidePopup': !phonePopup }">
                            <div class="popup-backdrop" 
                            :style="{
                                left: left + 'px', 
                                top: top + 'px',
                                transformOrigin: posX + ' ' + posY
                            }"
                            @click="closePopup()"
                            ></div>
                            <div class="popup-content popup-feedback__content" >
                                <div class="popup__title">{{ feedback.title }}</div>
                                <div class="popup__text" v-html="feedback.text"></div>
                                <FeedbackForm 
                                    class="popup-feedback-form"
                                    name="headerFeedback"
                                />
                            </div>
                        </div>                  
                    </div>
                </div>
                <div class="hidden-menu" :class="{ '_showPopup': menuShow, '_hidePopup': !menuShow }">
                    <Popup :leftPosition="left" :topPosition="top" :yPos="posY" :xPos="posX"/>
                    <div class="container">
                        <div class="hidden-menu-content">
                            <ul class="hidden-menu-nav">
                                <li 
                                    v-for="item in menu"
                                    :key="item.name"
                                    class="hidden-menu-nav__item animated-link"
                                    >
                                    <a :href="item.path">{{ item.name }}</a>
                                </li>
                            </ul>
                            <div class="hidden-menu-info">
                                <a :href="'tel:' + phone" class="hidden-menu-info__phone">{{ phone }}</a>
                                <div class="hidden-menu-info__title">Адрес</div>
                                <div class="hidden-menu-info__address">{{ address }}</div>
                                <a :href="'mailto:' + mail" class="hidden-menu-info__mail">{{ mail }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </fixed-header>
</template>

<script>
import FixedHeader from 'vue-fixed-header'
import Content from'@/assets/data.json'
import Popup from '@/components/PopupBackdrop/PopupBackdrop'
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm'

export default {
  components: {
    FixedHeader,
    Popup,
    FeedbackForm
  },

  data () {
    return {
        isFixed: false,
        darkTheme: false,
        phonePopup: false,
        menu: Content.menu,
        phone: Content.phone,
        address: Content.address,
        mail: Content.mail,
        feedback: Content.feedback,
        menuShow: false,
        scrollPosition: null

    }
  },
  methods: {
    menuToggle() {
        this.menuShow = !this.menuShow
        if (this.scrollPosition >= window.innerHeight) {
            this.darkTheme = false
        }
    },
    phonePopupOpener() {
        this.phonePopup = !this.phonePopup
        if (this.scrollPosition >= window.innerHeight) {
            this.darkTheme = false
        }
    },
    closePopup() {
		this.phonePopup = false	
    },
    updateScroll() {
        let project = document.getElementById('projects'),
        contacts = document.getElementById('contacts'),
        projectTop = project.offsetTop,
        projectHeight = project.offsetHeight,
        projectBottom = projectTop + projectHeight,
        contactsTop = contacts.offsetTop,
        contactsHeight = contacts.offsetHeight,
        contactsBottom = contactsTop + contactsHeight
        this.scrollPosition = window.scrollY
        if (this.scrollPosition >= window.innerHeight && !(this.scrollPosition >= projectTop && this.scrollPosition <= projectBottom) && !(this.scrollPosition >= contactsTop && this.scrollPosition <= contactsBottom)) {
           this.darkTheme = true
        } else {
            this.darkTheme = false
        } 
    },
  },
   mounted() {
        window.addEventListener('scroll', this.updateScroll);
        window.addEventListener("DOMContentLoaded", this.updateScroll);

        
    }

}
</script>

<style src="./Header.sass" lang="sass"></style>