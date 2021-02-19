<template>
    <div id="home" >
        <Intro 
			free="168" 
			@open-booking="openPopupBooking"
			@open-proposal="openPopupProposal"
			@round-position="roundPosition"
			@open-special="openPopupSpecial"
			@open-feedback="openPopupFeedback"
			@open-menu="openMenu"
			@close-menu="closeMenu"
			@open-video="openPopupVideo" />
        <Banner deadline="2021-02-25 00:00:00" />
        <Catalog 
			@open-booking="openPopupBooking"
			@open-proposal="openPopupProposal"
			@round-position="roundPosition"
			@open-special="openPopupSpecial"
			@open-gallery="openPopupGallery"
			/>
		<Possibilities
			@round-position="roundPosition"
			@open-feedback="openPopupFeedback"/>
		<Contacts
			@round-position="roundPosition"
			@open-feedback="openPopupFeedback"/>
    </div>
    
</template>

<script>
	import Intro from '@/components/Intro/Intro'
	import Banner from '@/components/Banner/Banner'
	import Catalog from '@/components/Catalog/Catalog'
	import Possibilities from '@/components/Possibilities/Possibilities'
	import Contacts from '@/components/Contacts/Contacts'
	export default {
		name: 'Home',
		data() {
			return {
				showPreloader: true,
			}
		},
		components: {
			Intro,
			Banner,
            Catalog,
			Possibilities,
			Contacts
		},
		methods: {
			openPopupBooking(item) {
				this.$emit('open-booking', item)
			},
			openPopupProposal() {
				this.$emit('open-proposal')
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
			openPopupSpecial(item) {
				this.$emit('open-special', item)
			},
			sortByCategories() {
				this.$emit('select-object')
			},
			roundPosition(event) {
				this.$emit('round-position', event)
			},
			openPopupVideo() {
				this.$emit('open-video')
			},
			openPopupGallery(item, index){
				this.$emit('open-gallery', item, index)
			}
		},
	}
	
</script>
