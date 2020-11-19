<template>
	<section class="section">
		<h2 
			class="section__title" 
			v-bind:data-title=" content.catalog.title ">
			{{ content.catalog.title }}
		</h2>
		<div class="filter">
			<div class="container">
				<div class="filter__wrapper">
					<div class="row _no-pudding-top">
						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">площадь, m<sup>2</sup></div>
								<vue-range-slider 
									ref="sliderArea" 
									v-model="valueArea"
									:min="minArea" 
									:max="maxArea"
									:tooltip-style="tooltipStyle"
									:process-style="processStyle"
									:bg-style="bgStyle"
									:slider-style="sliderStyle"
								>
								</vue-range-slider>
								<div class="filter-block__label">
									<span>от {{ valueArea[0] }}</span><span>до {{ valueArea[1] }}</span>
								</div>
							</div>
							
						</div>
						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">Диапазон цен</div>
								<vue-range-slider 
									ref="slider" 
									v-model="value"
									:min="min" 
									:max="max"
									:tooltip-style="tooltipStyle"
									:process-style="processStyle"
									:bg-style="bgStyle"
									:slider-style="sliderStyle"
								>
								</vue-range-slider>
								<div class="filter-block__label">
									<span>от $ {{ value[0] | currency }}</span><span>до $ {{ value[1] | currency }}</span>
								</div>
							</div>
							
						</div>
						<div class="col-md-4 filter__border-block">

						</div>
					</div>
					<div class="row">
						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">цоколь</div>
								<div class="filter-block__radio-wrapper">
									<div class="radiobutton">
										<input type="radio" id="plinth1" name="plinth" value="yes" v-model="plinthParam">
										<label for="plinth1" class="radiobutton__label">Да</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="plinth2" name="plinth" value="no" v-model="plinthParam">
										<label for="plinth2" class="radiobutton__label">Нет</label>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">отдельный санузел</div>
								<div class="filter-block__radio-wrapper">
									<div class="radiobutton">
										<input type="radio" id="bathroom1" name="bathroom" value="yes" v-model="bathroom">
										<label for="bathroom1" class="radiobutton__label">Да</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="bathroom2" name="bathroom" value="no" v-model="bathroom">
										<label for="bathroom2" class="radiobutton__label">Нет</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="bathroom3" name="bathroom" value="all" v-model="bathroom">
										<label for="bathroom3" class="radiobutton__label">Не важно</label>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">витраж</div>
								<div class="filter-block__radio-wrapper">
									<div class="radiobutton">
										<input type="radio" id="stainedGlass1" name="stainedGlass" value="yes" v-model="stainedGlass">
										<label for="stainedGlass1" class="radiobutton__label">Да</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="stainedGlass2" name="stainedGlass" value="no" v-model="stainedGlass">
										<label for="stainedGlass2" class="radiobutton__label">Нет</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">отдельный вход</div>
								<div class="filter-block__radio-wrapper">
									<div class="radiobutton">
										<input type="radio" id="separateSntrance1" name="separateSntrance" value="yes" v-model="separateSntrance">
										<label for="separateSntrance1" class="radiobutton__label">Да</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="separateSntrance2" name="separateSntrance" value="no" v-model="separateSntrance">
										<label for="separateSntrance2" class="radiobutton__label">Нет</label>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">видеонаблюдение</div>
								<div class="filter-block__radio-wrapper">
									<div class="radiobutton">
										<input type="radio" id="video1" name="video" value="yes" v-model="video">
										<label for="video1" class="radiobutton__label">Да</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="video2" name="video" value="no" v-model="video">
										<label for="video2" class="radiobutton__label">Нет</label>
									</div>
								</div>
							</div>
						</div>

						<div class="col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">подъезд для погрузки</div>
								<div class="filter-block__radio-wrapper">
									<div class="radiobutton">
										<input type="radio" id="loadingEntrance1" name="loadingEntrance" value="yes" v-model="loadingEntrance">
										<label for="loadingEntrance1" class="radiobutton__label">Да</label>
									</div>
									<div class="radiobutton">
										<input type="radio" id="loadingEntrance2" name="loadingEntrance" value="no" v-model="loadingEntrance">
										<label for="loadingEntrance2" class="radiobutton__label">Нет</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="filter-button">
					<button
						type="button" 
						class="button"
						v-on:click="sortByCategories"
					>
					показать варианты
					</button>
				</div>
				
			</div>
		</div>
		
		<div class="catalog">
			<div class="container">
				<transition-group class="catalog-wrapper" name="catalog-item" tag="ol">
					<CatalogItem 
						v-for="item in filteredProducts.slice(0, 4)" 
						v-bind:item="item" 
						:key="item.id" 
						class="catalog-item"
					/>
				</transition-group>

				<div v-if="errorText" class="catalog-item">
						No results, sorry!
				</div>
				<button 
					v-show="filteredProducts.length > 4"
					class="button _border"
				>Показать ещё ({{ filteredProducts.length - 4 }})
				</button>
			</div>
		</div>
	</section>

</template>

<script>
	import Flats from '@/assets/data.json'
	import CatalogItem from '@/components/CatalogItem/CatalogItem'
	import 'vue-range-component/dist/vue-range-slider.css'
	import VueRangeSlider from 'vue-range-component'
	export default {
		components: {
			CatalogItem,
			VueRangeSlider
			
		},
		data() {
			return {
				value: [0, 1000000],
				valueArea: [0, 100],
				content: Flats,
				flats: Flats.objects,
				minPrice: 0,
				maxPrice: 1000,
				minArea: 0,
				maxArea: 1000,
				sortedProducts: [],
				plinthParam: [],
				bathroom: [],
				stainedGlass: [],
				separateSntrance: [],
				video: [],
				loadingEntrance: [],
				filtered: false,
				errorText: false,
			}
		},
		created() {
			this.min = 0
			this.max = 1430999
			this.minArea = 0
			this.maxArea = 200
			this.enableCross = false
			this.tooltipStyle = {
				display: 'none'
			}
			this.bgStyle = {
				height: '2px',
				backgroundColor: 'rgba(244, 115, 33, 0.5)'
			}
			this.processStyle = {
				backgroundColor: '#F47321'
			}
			this.sliderStyle = {
				width: '19px',
				height: '22px',
				backgroundColor: '#F47321',
				backgroundImage: 'url(/images/range.svg)',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				borderRadius: '3px',
				top: '-10px',
				boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.13)',
				border: '1px solid #FFFFFF'
			}
		},
		methods: {

			setRangeSlidersArea() {
				if (this.minArea > this.maxArea) {
					let tmp = this.minArea;
					this.maxArea = this.minArea;
					this.minArea = tmp;
				}  
			},
			sortByCategories() {
				let vm = this;
				this.sortedProducts = this.flats
				this.filtered = true
				this.sortedProducts = this.sortedProducts.filter(function (item) {
					return (item.price >= vm.value[0] && item.price <= vm.value[1])
					&& (item.area >= vm.valueArea[0] && item.area <= vm.valueArea[1])
					&& (vm.plinthParam.length === 0 || vm.plinthParam.includes(item.plinth))
					&& (vm.bathroom.length === 0 || vm.bathroom.includes('all') || vm.bathroom.includes(item.bathroom))
					&& (vm.stainedGlass.length === 0 || vm.stainedGlass.includes(item.stainedGlass))
					&& (vm.separateSntrance.length === 0 || vm.separateSntrance.includes(item.separateSntrance))
					&& (vm.video.length === 0 || vm.video.includes(item.video))
					&& (vm.loadingEntrance.length === 0 || vm.loadingEntrance.includes(item.loadingEntrance))
					
					
					
				})
				if (this.sortedProducts.length === 0) {
					this.errorText = true
				} else {
					this.errorText = false
				}
			
			},

			onSubmit() {
				this.sortByCategories();
				console.log(this.errorText);
			}
			
		},
		computed: {
			filteredProducts() {
				if (this.filtered === true) {
					return this.sortedProducts
				} 
				else {
					return this.flats
				}
			},
	}   

	}
</script>

<style src="./Catalog.sass" lang="sass"></style>