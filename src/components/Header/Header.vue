<template>
    <fixed-header :fixed.sync="isFixed" :threshold="40">
        <header class="header" id="header" :class="{ 'is-fixed': isFixed, '_dark': darkTheme }">
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
                            <li class="header-menu__item animated-link" @click="$emit('open-special');">
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
                            id="phoneButton"
                            :class="{ '_active': phonePopup }"
                            @click="$emit('open-feedback'); menuShow = false"
                            >
                            <span class="header-phone-toggle__item"></span>
                            <span class="header-phone-toggle__item"></span>
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
            projectBottom = projectTop + projectHeight,
            contactsTop = contacts.offsetTop,
            contactsHeight = contacts.offsetHeight,
            contactsBottom = contactsTop + contactsHeight,
            topBannerHeight = topBanner.offsetHeight
            this.scrollPosition = window.scrollY
            if ( this.scrollPosition >= topBannerHeight){
                this.isFixed = true
            }
            if (this.scrollPosition >= window.innerHeight && !(this.scrollPosition >= projectTop && this.scrollPosition <= projectBottom) && !(this.scrollPosition >= contactsTop && this.scrollPosition <= contactsBottom)) {
            this.darkTheme = true
            } else {
                this.darkTheme = false
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