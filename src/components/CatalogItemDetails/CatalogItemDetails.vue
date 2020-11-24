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
							<div class="catalog-item-detail-head__title">Подробное описание</div>
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
							class="preview-slider catalog-item-detail-slider _for"
							v-if="item.gallery!=undefined && item.gallery.length > 0"
						>
							<div v-for="image in item.gallery" :key="image.id">
								<img :src="'/images/' + image.img" >
							</div>
						</Slick>
						<Slick
							:options="navSettings"
							class="preview-slider catalog-item-detail-slider _nav"
							v-if="item.gallery!=undefined && item.gallery.length > 0">
							<div v-for="image in item.gallery" :key="image.id" class="preview-slider__image">
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
								<div v-if="item.text">
									<div class="catalog-item-detail-about__title _v2">О компликсе</div>
									<div class="catalog-item-detail-about__text" v-html="item.text"></div>
								</div>

								<button 
									v-if="item.coords"
									class="catalog-item__button button button-map _full _border"
									@click="popupOpener($event);showPopupMap = !showPopupMap"
									>
									<span>Показать на карте</span>
								</button>
								<div v-if="item.infrastructure">
									<div class="catalog-item-detail-about__title">Инфраструктра</div>
									<ul class="catalog-item-detail-about-list">
										<li 
											class="catalog-item-detail-about-list__item" 
											v-for="list in item.infrastructure"
											:key="list"
											>
											{{ list }}
										</li>
									</ul>
								</div>
								<div v-if="item.advantage">
									<div class="catalog-item-detail-about__title">Приемущества</div>
									<ul class="catalog-item-detail-about-list">
										<li 
											class="catalog-item-detail-about-list__item _v2" 
											v-for="list in item.advantage"
											:key="list"
										>
											{{ list }}
										</li>
									</ul>
								</div>
							</div>
							
						</div>
					</div>
				</div>	
				<div 
					class="popup" 
					:class="{ '_showPopup': showPopupMap, '_hidePopup': !showPopupMap }"
					v-if="item.coords"
					>
					<div class="popup-backdrop" 
					:style="{
						left: left + 'px', 
						top: top + 'px',
						transformOrigin: posX + ' ' + posY
					}"
					@click="showPopupMap = !showPopupMap"
					></div>
					<div class="popup-content" >
						<yandex-map :coords="item.coords" style="width: 60vw; height: 60vh;">
							<ymap-marker 
							marker-id="123" 
							:coords="item.coords"
							:icon="markerIcon"
							
							/>
						</yandex-map>
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
	import { yandexMap, ymapMarker } from 'vue-yandex-maps'
	export default {
		name:'CatalogItemDetails',
		data() {
			return {
				flats: Flats.objects,
				proId: this.$route.params.Pid,
				title: "details",
				showPopup: false,
				showPopupMap: false,
				settings: {
					arrows: false,
					dots: false,
					fade: true,
					focusOnSelect: true,
					asNavFor: '._nav'
					
				},
				navSettings: {
					arrows: true,
					dots: false,
					focusOnSelect: true,
					slidesToShow: 5,
					asNavFor: '._for'
				},
				markerIcon: {
					layout: 'default#imageWithContent',
					imageHref: '/images/marker.svg',
					imageSize: [42, 78],
					imageOffset: [0, -40],
					contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				}
			}
		},
		components: {
			Slick,
			Modal,
			yandexMap, 
			ymapMarker
		},
	}
</script>

<style src="./CatalogItemDetails.sass" lang="sass"></style>