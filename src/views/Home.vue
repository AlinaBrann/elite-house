<template>
    <div id="app">
        <Intro 
			free="168" 
			@open-booking="openBookingPopup"
			@open-proposal="openProposalPopup"
			@round-position="roundPosition"
			@open-special="openSpecialPopup"
			@open-feedback="openFeedbackPopup" />
        <Banner deadline="2020-12-25 00:00:00" />
        <Catalog 
			@open-booking="openBookingPopup"
			@open-proposal="openProposalPopup"
			@round-position="roundPosition"
			@open-special="openSpecialPopup"/>
        <Projects/>
		<Possibilities/>
		<Contacts
			@round-position="roundPosition"
			@open-feedback="openFeedbackPopup"/>
    </div>
    
</template>

<script>
	import Intro from '@/components/Intro/Intro'
	import Banner from '@/components/Banner/Banner'
	import Catalog from '@/components/Catalog/Catalog'
	import Projects from '@/components/Projects/Projects'
	import Possibilities from '@/components/Possibilities/Possibilities'
	import Contacts from '@/components/Contacts/Contacts'

	import Vue from 'vue'


	export default {
		name: 'App',
		components: {
			Intro,
			Banner,
            Catalog,
			Projects,
			Possibilities,
			Contacts
		},
		methods: {
			openBookingPopup(item) {
				this.$emit('open-booking', item)
			},
			openProposalPopup() {
				this.$emit('open-proposal')
			},
			openFeedbackPopup() {
				this.$emit('open-feedback')
			},
			openSpecialPopup(item) {
				this.$emit('open-special', item)
			},
			roundPosition(event) {
				this.$emit('round-position', event)
			}
			
		}
	}
	Vue.mixin({
		data: function () {
			return {
				
			}
		},
		
		
		
	})
</script>

<style>

</style>