<template>
	<section class="section catalog-section" id="catalog">
		<h2 
			class="section__title catalog__title" 
			v-bind:data-title="content.catalog.title">
			{{ content.catalog.title }}
		</h2>
		<div class="filter">
			<div class="container">
				<div class="filter__wrapper">
					<div class="row _no-pudding-top">
						<div class="col-xs-12 col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">площадь, m<sup>2</sup></div>
								<div ref="sliderArea" class="filter-range"></div>
								
								<div class="filter-block__label">
									<span>от {{ valueArea[0] | currency }}</span><span>до {{ valueArea[1] | currency }}</span>
								</div>
							</div>
							
						</div>
						<div class="col-xs-12 col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">Диапазон цен</div>

								<div ref="sliderPrice" class="filter-range"></div>
								<div class="filter-block__label">
									<span>от $ {{ value[0] | currency }}</span><span>до $ {{ value[1] | currency }}</span>
								</div>
							</div>
							
						</div>
						<div class="col-xs-12 col-md-4 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">Предпочитаемый район</div>
								<transition-group
									class="filter-districts" 
									name="fade" 
									tag="ul"
									
									>
									<li 
										class="filter-districts__item" 
										@click="districtShow = !districtShow"
										v-for="district in districts" 
										:key="district">
										<span>{{ district }}</span>
									</li>
									<li
										class="filter-districts__item" 
										@click="districtShow = !districtShow"
										v-if="districts.length === 0"
										:key="1"
										>
										Все районы
									</li>
									
								</transition-group>
								<transition
									name="fade" 									
									>
									<div class="filter-districts-popup" v-if="districtShow">
										<div class="checkbox filter-districts-popup__checkbox">
											<input type="checkbox" @click="districtsUncheck()" id="district1" name="district" value="первомайский" v-model="districts">
											<label for="district1" class="checkbox__label">Первомайский район</label>
										</div>
										<div class="checkbox filter-districts-popup__checkbox">
											<input type="checkbox" @click="districtsUncheck()" id="district2" name="district" value="свердловский" v-model="districts">
											<label for="district2" class="checkbox__label">Свердловский район</label>
										</div>
										<div class="checkbox filter-districts-popup__checkbox">
											<input type="checkbox" @click="districtsUncheck()" id="district3" name="district" value="октябрьский" v-model="districts">
											<label for="district3" class="checkbox__label">Октябрьский район</label>
										</div>
										<div class="checkbox filter-districts-popup__checkbox">
											<input type="checkbox" @click="districtsUncheck()" id="district4" name="district" value="Ленинский" v-model="districts">
											<label for="district4" class="checkbox__label">Ленинский район</label>
										</div>
										<div class="checkbox filter-districts-popup__checkbox">
											<input type="checkbox" @click="districtsUncheck()"  id="district5" name="district" value="центральный" v-model="districts">
											<label for="district5" class="checkbox__label">Центральный район</label>
										</div>
										<div class="checkbox filter-districts-popup__checkbox">
											<input type="checkbox"  @click='uncheckAll()' id="district6" name="district" value="all" v-model="isUnCheckAll">
											<label for="district6"  class="checkbox__label">Все районы</label>
										</div>
									</div>
								</transition>
							</div>
						</div>
					</div>
					<transition name="slide">
						<div class="filter-addinations" v-show="filterAddinations">
							<div class="row">
								<div class="col-xs-12 col-md-4 filter__border-block">
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

								<div class="col-xs-12 col-md-4 filter__border-block">
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

								<div class="col-xs-12 col-md-4 filter__border-block">
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
								<div class="col-xs-12 col-md-4 filter__border-block">
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

								<div class="col-xs-12 col-md-4 filter__border-block">
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

								<div class="col-xs-12 col-md-4 filter__border-block">
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
					</transition>

					<div class="row">
						<div class="col-xs-12 col-md-12">
							<div class="filter-buttons">
								<button
									type="button" 
									class="button-more filter-buttons__more"
									:class="{ _active: filterAddinations}"
									@click="moreParameters()"
								>
								<span v-if="!filterAddinations">ещё параметры</span>
								<span v-else>Скрыть параметры</span>
								</button>
								<button
									type="button" 
									class="button-reset"
									@click="resetFilters()"
								>
								Сбросить фльтры
								</button>
								<button
									type="button" 
									class="button filter-buttons__button"
									@click="sortByCategories()"
								>
								показать варианты
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="catalog">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-12">
						<transition-group class="catalog-wrapper" name="catalog-item" tag="ol">
							<CatalogItem 
								v-for="item in filteredProducts.slice(0, 4)" 
								v-bind:item="item" 
								:key="item.id" 
								class="catalog-item"
								booking="item"
								@open-booking="openPopupBooking"
								@open-proposal="openPopupProposal"
								@round-position="roundPosition"
								@open-special="openPopupSpecial" 
							/>
						</transition-group>
						<transition name="catalog-item">
							<div v-if="errorText" class="catalog-item _no-results">
									No results, sorry!
							</div>
						</transition>
						<button 
							v-show="filteredProducts.length > 4"
							class="button _border"
						>Показать ещё ({{ filteredProducts.length - 4 }})
						</button>
					</div>
				</div>

			</div>
		</div>
	</section>

</template>

<script>
	import Flats from '@/assets/data.json'
	import CatalogItem from '@/components/CatalogItem/CatalogItem'
	import 'nouislider/distribute/nouislider.css'
	import noUiSlider from 'nouislider'


	export default {
		components: {
			CatalogItem,
			
		},
		data() {
			return {
				value: [50000, 300000],
				valueArea: [0, 100],
				content: Flats,
				flats: Flats.objects,
				minPrice: 0,
				maxPrice: 1000000,
				minArea: 0,
				maxArea: 1000,
				sortedProducts: [],
				plinthParam: [],
				bathroom: [],
				stainedGlass: [],
				separateSntrance: [],
				video: [],
				loadingEntrance: [],
				districts: [],
				isUnCheckAll: true,
				filtered: false,
				errorText: false,
				districtShow: false,
				filterAddinations: false,
				popupPrice: '',
				popupArea: '',
				popupTitle: '',
			}
		},

		methods: {
			
			districtsUncheck() {
				this.isUnCheckAll = false;				
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
					&& (vm.districts.length === 0 || vm.districts.includes('all') || vm.districts.includes(item.districts))
				})
				if (this.sortedProducts.length === 0) {
					this.errorText = true
				} else {
					this.errorText = false
				}
			
			},
			resetFilters() {
				this.isUnCheckAll = false;
				this.filtered = false;
				this.plinthParam = [];
				this.districts = [];
				this.bathroom = [];
				this.stainedGlass = [];
				this.separateSntrance = [];
				this.video = [];
				this.loadingEntrance = [];
			},
			moreParameters() {
				this.filterAddinations = !this.filterAddinations
			},
			uncheckAll: function(){
				this.isUnCheckAll = !this.isUnCheckAll;
				if(this.isUnCheckAll){ 
					this.districts = [];
				}
			},
			
			onSubmit() {
				this.sortByCategories();
				console.log(this.errorText);
			},
			closeModal() {
				this.modalVisible = false
			},
			openPopupBooking(item) {
				this.$emit('open-booking', item)
			},
			openPopupProposal() {
				this.$emit('open-proposal')
			},
			openPopupSpecial(item) {
				this.$emit('open-special', item)
			},
			roundPosition(event) {
				this.$emit('round-position', event)

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
	}   ,
	mounted() {
		let vm = this
		var sliderArea = vm.$refs.sliderArea,
		sliderPrice = vm.$refs.sliderPrice
		noUiSlider.create(
			sliderArea, {
				start: this.valueArea,
				connect: true,
				range: {
					'min': vm.minArea,
					'max': vm.maxArea
				}
			}
		);
		noUiSlider.create(
			sliderPrice, {
				start: this.value,
				connect: true,
				step: 10000,
				range: {
					'min': vm.minPrice,
					'max': vm.maxPrice
				}
			}
		);
		

		sliderArea.noUiSlider.on('update', function (values) {
			vm.valueArea = values
		});
		sliderPrice.noUiSlider.on('update', function (values) {
			vm.value = values
		});
	}

}
</script>

<style src="./Catalog.sass" lang="sass"></style>