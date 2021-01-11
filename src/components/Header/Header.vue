<template>
    <fixed-header :fixed.sync="isFixed" :threshold="40">
        <header 
            class="header" 
            id="header" 
            :class="{ 'is-fixed': isFixed, '_dark': darkTheme, '_background': headerBackground }">
            <div class="container">
                <div class="header-row">
                    <div class="header-logo-wrapper">
                        <a href="https://elitehouse.kg/" target="_blank" class="header-logo">
                            <img 
                                :key="2"
                                src="/images/logo.svg" 
                                class="header-logo__img _darklogo" 
                                alt="">
                            <img 
                                transition="fade"
                                :key="1"
                                src="/images/logo-white.svg" 
                                class="header-logo__img _whitelogo" 
                                alt="">
                        </a>
                    </div>
                    
                    <div class="header-menu-wrapper">
                        <ul class="header-menu">
                            <li class="header-menu__item animated-link" @click="$emit('open-special');$emit('close-menu');">
                                Специальные предложения
                            </li>
                            <li class="header-menu__item animated-link" @click="$emit('close-menu');">
                                <a href="#catalog" v-smooth-scroll="{offset: -100}" >Выбрать помещения</a>
                            </li>
                        </ul>
                    </div>
                    <div class="header-info-wrapper _jcfe">
                        <a :href="'tel:' + phone" class="header-phone">{{ phone }}</a>
                        <button class="header-button header-phone-toggle button-white"
                            id="phoneButton"
                            :class="{ '_active': phonePopup }"
                            @click="$emit('open-feedback'); menuShow = false"
                            >
                            <span class="header-phone-toggle__item"></span>
                            <span class="header-phone-toggle__item"></span>
                            <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.14668 1.13597L5.51668 0.0343018L8.88418 6.6093L6.61418 7.7268C6.16584 8.77597 8.41334 12.9676 9.36168 13.0368C9.43668 12.9885 11.5875 11.9301 11.5875 11.9301L15.0125 18.5401C15.0125 18.5401 12.7092 19.6685 12.6342 19.7035C6.08251 22.696 -3.28499 4.48847 3.14668 1.13597ZM4.75418 2.19763L3.90168 2.61764C-0.50999 4.9193 7.38251 20.2718 11.9417 18.1893L12.7508 17.7943L10.8583 14.1418L10.0033 14.5585C7.36751 15.8476 3.11834 7.7093 5.79084 6.2768L6.63001 5.86264L4.75418 2.19763Z" fill="black"/>
                            </svg>

                        </button>
                        <button 
                            class="header-button header-menu-toggle button-white" 
                            id="menuButton"
                            :class="{ '_active': menuShow }"
                            @click="$emit('open-menu');"
                            >
                            <span class="header-menu-toggle__item"></span>
                            <span class="header-menu-toggle__item"></span>
                        </button>          
                    </div>
                </div>
                
            </div>
        </header>
    </fixed-header>
</template>

<script>
import FixedHeader from 'vue-fixed-header'
import Content from'@/assets/data.json'

export default {
  components: {
    FixedHeader
  },

  data () {
    return {
        isFixed: false,
        darkTheme: false,
        headerBackground: false,
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
      openPopupBooking(item) {
        this.$emit('open-booking', item)
    },
    openPopupProposal() {
        this.$emit('round-roposal')
    },
    roundPosition(event) {
        this.$emit('round-position', event)

    },
    menuToggle() {
        this.menuShow = !this.menuShow
        if (this.scrollPosition >= window.innerHeight) {
            this.darkTheme = false
        }
    },
    phoneroundPosition() {
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
        topBanner = document.getElementById('topBanner')
        if (project || contacts || topBanner) {
            let projectTop = project.offsetTop,
            projectHeight = project.offsetHeight,
            projectBottom = projectTop + projectHeight - 30,
            contactsTop = contacts.offsetTop,
            contactsHeight = contacts.offsetHeight,
            contactsBottom = contactsTop + contactsHeight - 30,
            topBannerHeight = topBanner.offsetHeight
            this.scrollPosition = window.scrollY
            if ( this.scrollPosition >= topBannerHeight){
                this.isFixed = true
            }
            if (this.scrollPosition >= (window.innerHeight - 60) && !(this.scrollPosition >= projectTop && this.scrollPosition <= projectBottom) && !(this.scrollPosition >= contactsTop && this.scrollPosition <= contactsBottom)) {
                this.darkTheme = true
            } else {
                this.darkTheme = false
            } 
            if (this.scrollPosition >= (window.innerHeight - 60)) {
                this.headerBackground = true
            } else {
                this.headerBackground = false
            } 
        }
        
        
    },
  },
   mounted() {
       this.updateScroll()
        window.addEventListener('scroll', this.updateScroll);
        
        
    }

}
</script>

<style src="./Header.sass" lang="sass"></style>