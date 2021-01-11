<template>
	<div id="app" v-cloak>
		<transition name="fade-page">
		<Preloader v-if="showPreloader"/>
		</transition>
		<transition name="fade-page">
		<router-view 
			
			@round-position="roundPosition"
			@open-booking="openPopupBooking"
			@open-proposal="openPopupProposal"
			@open-special="openPopupSpecial"
			@open-feedback="openPopupFeedback"
			@open-menu="openMenu"
			@close-menu="closeMenu"
			@open-video="openPopupVideo"
			@open-gallery="openPopupGallery" /> 
		</transition>
		<HiddenMenu 
			@open-special="openPopupSpecial"
			@open-menu="openMenu"
			:class="{ '_showPopup': menuShow, '_hidePopup': !menuShow }"/>
		<PopupBooking 
			:class="{ '_showPopup': modalVisible, '_hidePopup': !modalVisible }"
			@close-modal="modalVisible = false"
			:title="popupTitle"
			:area="popupArea"
			/>
		
		<PopupSpecial 
			:class="{ '_showPopup': showPopupSpecial, '_hidePopup': !showPopupSpecial  }"
			@close-modal="showPopupSpecial = false"
			:image="openSpecialImg"
			:title="openSpecialTitle"
			:text="openSpecialText"
			/>
		<PopupVideo
			:class="{ '_showPopup': showPopupVideo, '_hidePopup': !showPopupVideo  }"
			@close="closePopupVideo()"
			:videoSrc="videoSrc"
			/>
		<PopupFeedback 
			:class="{ '_showPopup': showPopupFeedback, '_hidePopup': !showPopupFeedback  }"
			@close-modal="openPopupFeedback()"
			@open-modal="showPopupFeedback = false"
			/>
		<PopupGallery
			:class="{ '_showPopup': showPopupGallery, '_hidePopup': !showPopupGallery  }"
			:images="gallery"
			:index="index"
			@close-modal="showPopupGallery = false"
			/>
		<Popup 
			:leftPosition="left" 
			:topPosition="top" 
			:yPos="posY" 
			:xPos="posX"
			:style="'z-index:' + backZindex"
			:class="{'_active': backdrop, '_hide': !backdrop}"
			@click="closeAllPopups()"/>
		<PopupProposal 
			v-if="showPopupProposal" 
			:class="{ '_showPopup': showPopupProposal, '_hidePopup': !showPopupProposal }" 
			@close="closePopupProposal()"
			class="popup-offer"
		/>
	</div>
</template>
<script>
	import Preloader from '@/components/Preloader/Preloader'
	import PopupBooking from '@/components/PopupBooking/PopupBooking'
	import PopupProposal from '@/components/PopupProposal/PopupProposal'
	import PopupSpecial from '@/components/PopupSpecial/PopupSpecial'
	import PopupFeedback from '@/components/PopupFeedback/PopupFeedback'
	import PopupVideo from '@/components/PopupVideo/PopupVideo'
	import PopupGallery from '@/components/PopupGallery/PopupGallery'
	import HiddenMenu from '@/components/HiddenMenu/HiddenMenu'
	import Popup from '@/components/PopupBackdrop/PopupBackdrop'

	import Vue from 'vue'


	export default {
		name: 'App',
		data: function () {
			return {
				left: 0,
				top: 0,
				posY: 50,
				posX: 50,
				screenWidth: window.innerWidth,
				screenHeight: window.innerHeight,
				showPopupProposal: false,
				modalVisible: false,
				showPopupSpecial: false,
				showPopupVideo: false,
				showPopupFeedback: false,
				showPopupGallery: false,
				menuShow: false,
				showPreloader: true,
				popupArea: '',
				popupTitle: '',
				openSpecialTitle: '',
				openSpecialText: '',
				openSpecialImg: '',
				videoSrc: '',
				backdrop: false,
				backZindex: 10,
				bodyClassClose: 'modal-close',
				bodyClassOpen: 'modal-open',
				bodyClass: this.bodyClassClose,
				gallery: [],
				index: 0
			}
		},
		components: {
			Preloader,
			PopupProposal,
			PopupBooking,
			Popup,
			PopupSpecial,
			PopupVideo,
			PopupGallery,
			PopupFeedback,
			HiddenMenu

		},
		methods: {
			
			trans() {
				if(this.top <= this.screenHeight / 3){
					this.posY = 30
				} else if(this.top >= this.screenHeight / 3 * 2){
					this.posY = 80
				} else {
					this.posY = 50
				}
				if(this.left <= this.screenWidth / 3){
					this.posX = 30
				} else if(this.left >= this.screenWidth / 3 * 2){
					this.posX = 80
				} else {
					this.posX = 50
				}
			},
			roundPosition(event) {
				let current = event.currentTarget
				this.backdrop = !this.backdrop,
				this.left = current.getBoundingClientRect().left
				this.top = current.getBoundingClientRect().top
				this.trans()
			},
			closeAllPopups() {
				this.backdrop = false
				this.showPopupProposal = false
				this.modalVisible = false
				this.showPopupSpecial = false
				this.showPopupFeedback =  false
			},
			openPopupBooking(item) {
				this.popupArea = item.area,
				this.popupTitle = item.title,
				this.modalVisible = true
			},
			openPopupFeedback() {
				this.menuShow = false
				if (!this.menuShow) {
					this.roundPosition(event) 
				}
				this.showPopupFeedback = !this.showPopupFeedback
				let header = document.getElementById('header'),
				phoneButton = document.getElementById('phoneButton'),
				menuButton = document.getElementById('menuButton');
				if (this.showPopupFeedback ) {
					phoneButton.classList.add('_active')
					menuButton.classList.remove('_active')
					header.classList.remove('_dark','_background')
					this.backdrop = true
					this.bodyClass = this.bodyClassOpen
				} else {
					phoneButton.classList.remove('_active')
					this.backdrop = false
					this.bodyClass = this.bodyClassClose
				}
			},
			openMenu() {
				this.menuShow = !this.menuShow
				this.showPopupFeedback = false
				if (!this.showPopupFeedback) {
					this.roundPosition(event) 
				}
				let header = document.getElementById('header'),
				phoneButton = document.getElementById('phoneButton'),
				menuButton = document.getElementById('menuButton');
				
				if (this.menuShow ) {
					menuButton.classList.add('_active')
					phoneButton.classList.remove('_active')
					header.classList.remove('_dark','_background')
					this.backdrop = true
					this.bodyClass = this.bodyClassOpen
				} else {
					menuButton.classList.remove('_active')
					this.backdrop = false
					this.bodyClass = this.bodyClassClose
				}
			},
			closeMenu() {
				this.menuShow = false
				this.showPopupFeedback = false
				this.roundPosition(event) 
				let menuButton = document.getElementById('menuButton'),
				phoneButton = document.getElementById('phoneButton');
				menuButton.classList.remove('_active')
				phoneButton.classList.remove('_active')
				this.backdrop = false
				this.bodyClass = this.bodyClassClose
			},
			closePopupFeedback() {
				this.showPopupFeedback = false
				this.backdrop = !this.backdrop
				let phoneButton = document.getElementById('phoneButton');
				if (this.showPopupFeedback ) {
					phoneButton.classList.add('_active')
					this.bodyClass = this.bodyClassOpen
				} else {
					phoneButton.classList.remove('_active')
					this.bodyClass = this.bodyClassClose
				}
			},
			openPopupSpecial(item) {
				if ( item) {
				if ( item.PopupSpecial) {
					
					this.openSpecialImg = item.PopupSpecial.img
					this.openSpecialText = item.PopupSpecial.text
					this.openSpecialTitle = item.PopupSpecial.title
				}
				}
				
				this.showPopupSpecial = true
			},
			openPopupGallery(item, index) {
				this.gallery = item.gallery	
				this.index = index
				this.showPopupGallery = true
			},
			openPopupProposal() {
				this.roundPosition(event) 
				this.showPopupProposal = true
				if (this.showPopupProposal ) {
					this.backZindex = 100
					this.bodyClass = this.bodyClassOpen
				} 
			},
			closePopupProposal() {
				this.showPopupProposal = false
				this.backdrop = false
				this.backZindex = 10
				this.bodyClass = this.bodyClassClose
			},
			closePopupVideo() {
				this.showPopupVideo = false
				this.backdrop = false
				this.backZindex = 10
				this.bodyClass = this.bodyClassClose
				this.videoSrc = ''
			},
			openPopupVideo() {
				this.roundPosition(event) 
				this.videoSrc = 'https://www.youtube-nocookie.com/embed/3omF4eooT2A?&amp;autoplay=1&rel=0'
				this.showPopupVideo = true
				if (this.showPopupVideo ) {
					this.backZindex = 100
					this.bodyClass = this.bodyClassOpen
				} 
			},
			showPreloaderFunc() {
				setTimeout(() => this.showPreloader = false, 5000);
			},
			addBodyClass() {
				document.body.classList.add(this.bodyClass);
			},
			updateVH(){
				document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');				
			}
		},
		watch: {
			bodyClass: function (val) {
				document.body.className = val;
			},},
		mounted() {
			this.showPreloaderFunc()
			window.addEventListener('resize', this.updateVH);
			this.updateVH();
			
		}
	}
	Vue.mixin({
	
	})
</script>

<style lang="sass" >
@import '@/assets/styles/variables'

@import '@/assets/styles/libs/media'
#app 
	+max-screen($screen-sm)
		// position: fixed
		width: 100%
		// height: calc(var(--vh, 1vh) * 100)
		overflow-x: hidden

</style>