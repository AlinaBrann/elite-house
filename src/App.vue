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
			@open-menu="openMenu" /> 
		</transition>
		<HiddenMenu 
			@open-special="openPopupSpecial"
			:class="{ '_showPopup': menuShow, '_hidePopup': !menuShow }"/>
		<PopupBooking 
			:class="{ '_showPopup': modalVisible, '_hidePopup': !modalVisible }"
			@close-modal="modalVisible = false"
			:price="popupPrice"
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
		<PopupFeedback 
			:class="{ '_showPopup': showPopupFeedback, '_hidePopup': !showPopupFeedback  }"
			@close-modal="showPopupFeedback = false"
			@open-modal="showPopupFeedback = false"
			/>
		
		<Popup 
			:leftPosition="left" 
			:topPosition="top" 
			:yPos="posY" 
			:xPos="posX"
			:class="{'_active': backdrop, '_hide': !backdrop}"
			@close-all="closeAllPopups"/>
		<PopupProposal 
			v-if="showPopupProposal" 
			:class="{ '_showPopup': showPopupProposal, '_hidePopup': !showPopupProposal }" 
			@close="showPopupProposal = false; backdrop = false"
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
				showPopupFeedback: false,
				menuShow: false,
				showPreloader: true,
				popupPrice: '',
				popupArea: '',
				popupTitle: '',
				openSpecialTitle: '',
				openSpecialText: '',
				openSpecialImg: '',
				backdrop: false
			}
		},
		components: {
			Preloader,
			PopupProposal,
			PopupBooking,
			Popup,
			PopupSpecial,
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
				this.showPopupProposal = 
				this.modalVisible = 
				this.showPopupSpecial = 
				this.showPopupFeedback =  false
			},
			openPopupBooking(item) {
				this.popupPrice = item.price,
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
				let phoneButton = document.getElementById('phoneButton');
				let menuButton = document.getElementById('menuButton');
				if (this.showPopupFeedback ) {
					phoneButton.classList.add('_active')
					menuButton.classList.remove('_active')
					this.backdrop = true
				} else {
					phoneButton.classList.remove('_active')
					this.backdrop = false
				}
			},
			openMenu() {
				this.menuShow = !this.menuShow
				this.showPopupFeedback = false
				let phoneButton = document.getElementById('phoneButton');
				let menuButton = document.getElementById('menuButton');
				if (this.menuShow ) {
					menuButton.classList.add('_active')
					phoneButton.classList.remove('_active')
					this.backdrop = true
				} else {
					menuButton.classList.remove('_active')
					this.backdrop = false
				}
			},
			closePopupFeedback() {
				this.showPopupFeedback = false
				this.backdrop = !this.backdrop
				let phoneButton = document.getElementById('phoneButton');
				if (this.showPopupFeedback ) {
					phoneButton.classList.add('_active')
				} else {
					phoneButton.classList.remove('_active')
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
			openPopupProposal() {
				this.roundPosition(event) 
				this.showPopupProposal = true
				let header = document.getElementById('header');
				if (this.showPopupProposal ) {
					header.classList.add('_back')
				}
			},
			showPreloaderFunc() {
				setTimeout(() => this.showPreloader = false, 5000);
			}
		},
		mounted() {
			this.showPreloaderFunc()
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
		position: fixed
		width: 100%
		height: 100%
		overflow-x: hidden

</style>