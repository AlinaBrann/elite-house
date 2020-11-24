<template>
    <div id="app">
        <Intro free="168" />
        <Banner deadline="2020-12-25 00:00:00" />
        <Catalog/>
    </div>
    
</template>

<script>
	import Intro from '@/components/Intro/Intro'
	import Banner from '@/components/Banner/Banner'
	import Catalog from '@/components/Catalog/Catalog'

	import Vue from 'vue'


	export default {
		name: 'App',
		components: {
			Intro,
			Banner,
			Catalog
		}
	}
	Vue.mixin({
		data: function () {
			return {
				left: 0,
				top: 0,
				posY: "80%",
				posX: "80%",
				screenWidth: window.innerWidth,
				screenHeight: window.innerHeight
			}
		},
		
		methods: {
			trans() {
				if(this.top <= this.screenHeight / 2) {
					this.posY = "20%"
				} else if(this.top <= this.screenHeight / 2.5) {
					this.posY = "70%"
				} else if(this.left <= this.screenWidth / 2){
					this.posX = "20%"
				} else if(this.left <= this.screenWidth / 2.5){
					this.posX = "50%"
				}
			},
			popupOpener(event) {
				let current = event.currentTarget
					// currentAttr = current.getAttribute('data-popup-opener');

				this.left = current.getBoundingClientRect().left
				this.top = current.getBoundingClientRect().top
				this.trans()
				console.log(this.left);
				
			},
			openModal() {
				this.showPopup = true
			},
		}
		
	})
</script>

<style>

</style>