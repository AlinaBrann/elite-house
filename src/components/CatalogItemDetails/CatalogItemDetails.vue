<template>
	<div>
		<div 
		class="catalog-item-details container"
		v-for="(item, index) in flats" 
		:key="index" 
		>
			<div v-if="proId == item.id" class="catalog-item catalog-item-detail">
				<div class="row">
					<div class="col-xs-3 col-md-7">
						<div class="catalog-item-details-head">
							<router-link to="/#catalog" class="button-arrow">
								<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z" fill="#F47321"/>
								</svg>
							</router-link>
						</div>
					</div>
					<div class="col-xs-9 col-md-5">
						<div class="catalog-item-details-head">
							<div class="catalog-item-details-head__title">Подробное описание</div>
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
							<div v-for="(image,i) in item.gallery" :key="i">
								<img :src="'/images/' + image.img" @click="$emit('open-gallery', item, i);">
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
						<div class="catalog-item__content catalog-item-detail__content">
							<div class="catalog-item__area">{{ item.area }} m<sup>2</sup></div>
							<div class="catalog-item__address" v-html="item.address"></div>
							
							<button class="catalog-item__button button _full" @click="$emit('open-booking', item)">ЗАБРОНИРОВАТЬ</button>
							<button 
								class="catalog-item__button button _full _border _dark-text"
								@click="$emit('open-special', item);"
								>
								Спец. предложение
							</button>
							<div class="catalog-item-detail-about">
								<div v-if="item.text">
									<div class="catalog-item-detail-about__title _v2">О компликсе</div>
									<div class="catalog-item-detail-about__text" v-html="item.text"></div>
								</div>

								<MapBlock :coords="item.coords" :height="400" :center="[42.880534, 74.616267]"/>

								<button 
									class="catalog-item__button button _full _border _dark-text"
									@click="showPopupDocs = true"
									v-if="item.documents"
									>
									Документация объекта
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
					class="popup _dark" 
					:class="{ '_showPopup': showPopupDocs, '_hidePopup': !showPopupDocs }"
					v-if="item.documents"
					>
					<div class="popup-back-closer" @click="showPopupDocs = false"></div>
					<div class="popup-content" >
						<div class="popup-body">
							<button @click="showPopupDocs = false" class="popup-closer"></button>
							<div class="popup__title">Документация объекта</div>
							<ul class="popup-docs">
								<li class="popup-docs-item" v-for="(doc,i) in item.documents" :key="i">
									<a :href="doc.path" class="popup-docs-item__row" target="_blank">
										<div class="popup-docs-item__icon-wrap">
											<img 
												class="popup-docs-item__icon"
												v-if="doc.type" 
												:src="'/images/' + doc.type + '.svg'" 
												:alt="doc.name ">
											<img 
												class="popup-docs-item__icon"
												v-else 
												src="/images/simple-doc.svg" 
												:alt="doc.name ">
										</div>
										<div class="popup-docs-item__col">
											<div class="popup-docs-item__title">{{ doc.name }}</div>
											<div class="popup-docs-item__small" v-if="doc.size || doc.date">
												<span v-if="doc.size">{{ doc.size }} </span>
												<span v-if="doc.date">• {{ doc.date }}</span>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>			
			</div>
		</div>
	</div>
</template>
<script>
	import Flats from '@/assets/data.json'
	import Slick from 'vue-slick'
	import MapBlock from '@/components/MapBlock/MapBlock'

	export default {
		name:'CatalogItemDetails',
		data() {
			return {
				flats: Flats.objects,
				proId: this.$route.params.Pid,
				title: "details",
				showPopup: false,
				showPopupMap: false,
				showPopupDocs: false,
				
				settings: {
					arrows: false,
					dots: false,
					fade: true,
					focusOnSelect: true,
					asNavFor: '._nav'
					
				},
				navSettings: {
					arrows: false,
					dots: false,
					focusOnSelect: true,
					slidesToShow: 5,
					asNavFor: '._for',
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2
							}
						}
					]
				}
			}
		},
		components: {
			Slick,
			MapBlock,
		},
		methods: {
			
		}
	}
</script>

<style src="./CatalogItemDetails.sass" lang="sass"></style>