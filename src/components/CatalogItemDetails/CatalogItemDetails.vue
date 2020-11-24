<template>
	<div>
		<div 
		class="catalog-item-details container"
		v-for="item in flats" 
		:key="item.id" 
		>
			<div v-if="proId == item.id" class="catalog-item catalog-item-detail">
				<div class="row">
					<div class="col-xs-12 col-md-7">
						<div class="catalog-item-details-head">
							<router-link to="/">back</router-link>
						</div>
					</div>
					<div class="col-xs-12 col-md-5">
						<div class="catalog-item-details-head">
							<div class="catalog-item-ditail-head__title">Подробное описание</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-md-7">
						<div class="catalog-item__layout catalog-item-detail__layout">
							<img 
								v-if="item.layout"
								:src="/images/ + item.layout"
								:alt="item.title"
							>
						</div>
						<Slick
							:options="settings"
							class="'preview-slider _for for"
							v-if="item.gallery!=undefined && item.gallery.length > 0"
						>
							<div v-for="image in item.gallery" :key="image.id">
								<img :src="'/images/' + image.img" >
							</div>
						</Slick>
						<Slick
							:options="navSettings"
							class="preview-slider _nav nav"
							v-if="item.gallery!=undefined && item.gallery.length > 0">
							<div v-for="image in item.gallery" :key="image.id">
								<img :src="'/images/' + image.img" >
							</div>
						</Slick>
					</div>
					<div class="col-xs-12 col-md-5">
						<div class="catalog-item__content">
							<div class="catalog-item__area">{{ item.area }} m<sup>2</sup></div>
							<div class="catalog-item__address" v-html="item.address"></div>
							<div class="catalog-item__price">
								$ {{ item.price | currency }}
								<span v-if="item.currency"> {{ item.currency }}</span>
								<span v-else> &#8381;</span>
							</div>
							<button class="catalog-item__button button _full" @click="goTodetail(item.id)">ЗАБРОНИРОВАТЬ</button>
							<button 
								class="catalog-item__button button _full _border"
								@click="openModal();popupOpener($event);"
							>Спец. предложение</button>
							<div class="catalog-item-detail-about">
								<div class="catalog-item-detail-about__title">О компликсе</div>
								<div class="catalog-item-detail-about__text" v-html="item.text">
								</div>
							</div>
							
						</div>
					</div>
				</div>				
			</div>
		</div>
		<Modal 
            :leftPos="left"
            :topPos="top"
            :originX="posX"
            :originY="posY"
            v-if="showPopup" 
            :class="{ '_showPopup': showPopup, '_hidePopup': !showPopup }" 
            @close="showPopup = false"
            class="popup-offer"
        />
	</div>
</template>
<script>
	import Flats from '@/assets/data.json'
	import Slick from 'vue-slick'
	import Modal from '@/components/Modal/Modal'

	export default {
		name:'CatalogItemDetails',
		data() {
			return {
				flats: Flats.objects,
				proId: this.$route.params.Pid,
				title: "details",
				showPopup: false,
				settings: {
					arrows: false,
					dots: false,
					fade: true,
					focusOnSelect: true,
					asNavFor: '.nav'
					
				},
				navSettings: {
					arrows: true,
					dots: false,
					focusOnSelect: true,
					slidesToShow: 5,
					asNavFor: '.for'
				}
			}
		},
		components: {
			Slick,
			Modal
		},
	}
</script>

<style src="./CatalogItemDetails.sass" lang="sass"></style>