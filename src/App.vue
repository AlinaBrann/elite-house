<template>
	<div id="app">
		<transition name="fade">
		<router-view 
			@round-position="roundPosition"
			@open-booking="openBookingPopup"
			@open-proposal="openProposalPopup"
			@open-special="openSpecialPopup"
			@open-feedback="openFeedbackPopup" /> 
		</transition>
		<BookingPopup 
			:class="{ '_showPopup': modalVisible, '_hidePopup': !modalVisible }"
			@close-modal="modalVisible = false"
			:price="popupPrice"
			:title="popupTitle"
			:area="popupArea"
			/>
		
		<SpecialPopup 
			:class="{ '_showPopup': showSpecialPopup, '_hidePopup': !showSpecialPopup  }"
			@close-modal="showSpecialPopup = false"
			:image="openSpecialImg"
			:title="openSpecialTitle"
			:text="openSpecialText"
			/>
		<FeedbackPopup 
			:class="{ '_showPopup': showFeedbackPopup, '_hidePopup': !showFeedbackPopup  }"
			@close-modal="showFeedbackPopup = false"
			@open-modal="showFeedbackPopup = false"
			/>
		
		<Popup 
			:leftPosition="left" 
			:topPosition="top" 
			:yPos="posY" 
			:xPos="posX"
			:class="{'_active': backdrop, '_hide': !backdrop}"
			@click="$emit('close')"/>
		<ProposalModal 
			v-if="showProposalPopup" 
			:class="{ '_showPopup': showProposalPopup, '_hidePopup': !showProposalPopup }" 
			@close="showProposalPopup = false; backdrop = false"
			class="popup-offer"
		/>
	</div>
</template>
<script>

	import BookingPopup from '@/components/BookingPopup/BookingPopup'
	import ProposalModal from '@/components/ProposalModal/ProposalModal'
	import SpecialPopup from '@/components/SpecialPopup/SpecialPopup'
	import FeedbackPopup from '@/components/FeedbackPopup/FeedbackPopup'

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
				showProposalPopup: false,
				modalVisible: false,
				showSpecialPopup: false,
				showFeedbackPopup: false,
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
			ProposalModal,
			BookingPopup,
			Popup,
			SpecialPopup,
			FeedbackPopup

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
				console.log(this.screenWidth / 3 * 2);
			},
			roundPosition(event) {
				let current = event.currentTarget
				this.backdrop = !this.backdrop,
				this.left = current.getBoundingClientRect().left
				this.top = current.getBoundingClientRect().top
				this.trans()
				console.log(this.left);
				
			},
			openBookingPopup(item) {
				this.popupPrice = item.price,
				this.popupArea = item.area,
				this.popupTitle = item.title,
				this.modalVisible = true
			},
			openFeedbackPopup() {
				this.showFeedbackPopup = !this.showFeedbackPopup
				let phoneButton = document.getElementById('phoneButton');
				if (this.showFeedbackPopup ) {
					phoneButton.classList.add('_active')
				}
			},
			openSpecialPopup(item) {
				if ( item) {
				if ( item.specialPopup) {
					
					this.openSpecialImg = item.specialPopup.img
					this.openSpecialText = item.specialPopup.text
					this.openSpecialTitle = item.specialPopup.title
				}
				}
				this.showSpecialPopup = true
			},
			openProposalPopup() {
				this.showProposalPopup = true
				let header = document.getElementById('header');
				if (this.showProposalPopup ) {
					header.classList.add('_back')
				}
			},
		},
		mounted() {
			
		}
	}
	Vue.mixin({
		
		
	})
</script>