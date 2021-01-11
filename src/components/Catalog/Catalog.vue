<template>
	<div>
	<section class="section catalog-section" id="catalog" >
		<h2 
			class="section__title catalog__title" 
			v-bind:data-title="content.catalog.title">
			{{ content.catalog.title }}
		</h2>
		<div class="filter">
			<div class="container">
				<div class="filter__wrapper">
					<div class="row _no-pudding-top">
						<div class="col-xs-12 col-sm-8 filter__border-block">
							<div class="filter-block">
								<div class="filter-block__title">площадь, m<sup>2</sup></div>
								<div ref="sliderArea" class="filter-range"></div>
								
								<div class="filter-block__label">
									<span>от {{ valueArea[0] | currency }}</span><span>до {{ valueArea[1] | currency }}</span>
								</div>
							</div>
							
						</div>
						
						<div class="col-xs-12 col-sm-4 filter__border-block">
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
									<div class="filter-districts-popup" v-if="districtShow" v-on-clickaway="hideDistricts">
										<button @click="districtShow = false" class="filter-districts-closer"></button>
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
								<div class="col-xs-12 col-sm-4 filter__border-block">
									<div class="filter-block">
										<div class="filter-block__title">Объекты</div>
										<transition-group
											class="filter-districts" 
											name="fade" 
											tag="ul"
											
											>
											<li 
												class="filter-districts__item" 
												@click="objectShow = !objectShow"
												v-for="selectObject in selectedObjects" 
												:key="selectObject">
												<span>{{ selectObject }}</span>
											</li>
											<li
												class="filter-districts__item" 
												@click="objectShow = !objectShow"
												v-if="selectedObjects.length === 0"
												:key="1"
												>
												Все объекты
											</li>
											
										</transition-group>
										<transition
											name="fade" 									
											>
											<div class="filter-districts-popup _left" v-if="objectShow" v-on-clickaway="hideObjects">
												<button @click="objectShow = false" class="filter-districts-closer"></button>
												<div class="checkbox filter-districts-popup__checkbox" v-for="(object, i) in objects" :key="i">
													<input type="checkbox" @click="objectsUncheck()" :id="'object' + i" name="objects" :value="object" v-model="selectedObjects">
													<label :for="'object' + i" class="checkbox__label">{{ object }}</label>
												</div>
												<div class="checkbox filter-districts-popup__checkbox">
													<input type="checkbox"  @click='uncheckAllObjects()' id="object" name="objects" value="all" v-model="isUnCheckAllObjects">
													<label for="object"  class="checkbox__label">Все объекты</label>
												</div>
											</div>
										</transition>
									</div>
								</div>

								<div class="col-xs-12 col-sm-4 filter__border-block">
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

								<div class="col-xs-12 col-sm-4 filter__border-block">
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
								<div class="col-xs-12 col-sm-4 filter__border-block">
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

								<div class="col-xs-12 col-sm-4 filter__border-block">
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

								<div class="col-xs-12 col-sm-4 filter__border-block">
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
									ref="reset"
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
								@open-gallery="openPopupGallery"
							/>
						</transition-group>
						<transition name="catalog-item">
							<div v-if="errorText" class="catalog-item _no-results">
								Подходящих предложений не найдено. 
								<br>Попробуйте другие параметры подбора.
							</div>
						</transition>
						<button 
							v-show="filteredProducts.length > 4"
							class="button catalog__button _border"
						>Показать ещё ({{ filteredProducts.length - 4 }})
						</button>
					</div>
				</div>

			</div>
		</div>
	</section>
	<section class="section projects" id="projects">
		<div class="projects-row">
			<div class="projects-content">
				<h2 
					class="section__title projects-content__title _white" 
					v-bind:data-title="projects.title">
					{{ projects.title }}
				</h2>
				<div class="projects-content__text" v-html="projects.text"></div>
			</div>
			<div class="projects-slider-wrapper">
				<Slick
					:options="settings"
					@beforeChange="handleBeforeChange"
					@afterChange="handleAfterChange"
					class="projects-slider"
					v-if="projects.slider!=undefined && projects.slider.length > 0"
					>
					<div v-for="(item,i) in projects.slider" :key="i" class="projects-slider-slide">
						<div class="projects-slider-slide__wrapper">
							<img :src="'/images/' + item.img" @click="openModal(item)">
							<div class="projects-slider-slide__content">
								<div class="projects-slider-slide__title">{{ item.name }}</div>
								<div class="projects-slider-slide__address">{{ item.address }}</div>
								<button class="projects-slider-slide__button button _border" @click="openModal(item)">Подробнее</button>
							</div>
						</div>
					</div>
				</Slick>
			</div>
		</div>
		<div 
			class="popup projects-popup _dark" 
			:class="{ '_showPopup': modalVisible, '_hidePopup': !modalVisible }"
			>
			<div class="popup-back-closer" @click="modalVisible = false"></div>
			<div class="popup-content" >
				<div class="popup-body">
					<button @click="modalVisible = false" class="popup-closer"></button>
					<div class="popup__title">{{ popupTitle }}</div>
					<p>{{ popupAddress }}</p>
					<p>{{ delivery }}</p>
					<Slick
						ref="slick"
						:options="forSettings"
						class="preview-slider projects-popup-slider _for _projects-for"
						v-show="popupGallery!=undefined && popupGallery.length > 0"
						>
						<div v-for="image in popupGallery" :key="image.id">
							<img :src="'/images/' + image.img" >
						</div>
					</Slick>
					<Slick
					ref="slickNav"
						:options="navSettings"
						class="preview-slider projects-popup-slider _nav _projects-nav"
						v-show="popupGallery!=undefined && popupGallery.length > 0">
						<div v-for="image in popupGallery" :key="image.id" class="preview-slider__image">
							<img :src="'/images/' + image.img" >
						</div>
					</Slick>
					<div class="projects-popup__small-title">О компликсе</div>
					<div class="projects-popup__text" v-html="aboutText"></div>

					<MapBlock :coords="coords" :center="[42.880534, 74.616267]"/>

					<div v-if="infrastructure">
						<div class="projects-popup__small-title">Инфраструктра</div>
						<ul class="projects-popup-list _v1">
							<li 
								class="projects-popup-list__item" 
								v-for="list in infrastructure"
								:key="list"
								>
								{{ list }}
							</li>
						</ul>
					</div>
					<div v-if="advantage">
						<div class="projects-popup__small-title">Приемущества</div>
						<ul class="projects-popup-list">
							<li 
								class="projects-popup-list__item _v2" 
								v-for="list in advantage"
								:key="list"
							>
								{{ list }}
							</li>
						</ul>
					</div>
					<div class="projects-popup__text" v-html="aboutText2"></div>
					<a 
						href="#catalog" 
						v-smooth-scroll 
						class="button projects-popup__button" 
						v-if="objectName" 
						@click="selectObjectOut(objectName);">
						Посмотреть планировки
					</a>
				</div>
			</div>
		</div>	
	</section>
	</div>
</template>

<script>
import $ from 'jquery'
import CatalogItem from '@/components/CatalogItem/CatalogItem'
import MapBlock from '@/components/MapBlock/MapBlock'
import Flats from '@/assets/data.json'
import Projects from '@/assets/data.json'
import 'nouislider/distribute/nouislider.css'
import noUiSlider from 'nouislider'
import Slick from 'vue-slick';
import { mixin as clickaway } from 'vue-clickaway';

export default {
	mixins: [ clickaway ],
	components: {
		CatalogItem,
		Slick,
		MapBlock
	},
	props: {
		select: Array
	},
	data() {
		return {
			newObject: [],
			valueArea: [0, 100],
			content: Flats,
			selectedObjects: [],
			flats: Flats.objects,
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
			isUnCheckAllObjects: true,
			filtered: false,
			errorText: false,
			districtShow: false,
			filterAddinations: false,
			popupArea: '',
			sliderArea: this.$refs.sliderArea,
			objectShow: false,
			objects: [
				"Нью Йорк",
				"Объект 2",
				"Объект 3",
				"Объект 4",
				"Объект 5"
			],
			projects: Projects.projects,
			showMap: false,
			modalVisible: false,
			popupTitle: '',
			popupAddress: '',
			popupGallery: '',
			aboutText: '',
			aboutText2: '',
			infrastructure: '',
			advantage: '',
			delivery: '',
			coords: '',
			objectName: [],
			settings: {
				arrows: true,
				dots: false,
				fade: false,
				speed: 900,
				slidesToShow: 2,
				focusOnSelect: true,
				centerMode: false,
				asNavFor: '._projects-nav',
				prevArrow: "<button class='button-arrow _prev _white'><svg width='17' height='16' viewBox='0 0 17 16' fill='none'><path d='M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z'/></svg></button>",
				nextArrow: "<button class='button-arrow _next _white'><svg width='17' height='16' viewBox='0 0 17 16' fill='none'><path d='M0.292891 7.29289C-0.0976333 7.68341 -0.0976334 8.31658 0.29289 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07106 15.0711C8.46159 14.6805 8.46159 14.0474 8.07106 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.92893L0.292891 7.29289ZM17 7L0.999998 7L0.999998 9L17 9L17 7Z'/></svg></button>",
				responsive: [{
					breakpoint: 868,
					settings: {
						slidesToShow: 1
					}
				}]

			},
			forSettings: {
				arrows: false,
				dots: false,
				fade: true,
				speed: 900,
				slidesToShow: 1,
				centerMode: false,
				asNavFor: '._projects-nav',

			},
			navSettings: {
				arrows: false,
				dots: false,
				focusOnSelect: true,
				slidesToShow: 5,
				asNavFor: '._projects-for',
				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						arrows: true
					}
				}]
			}

		}
	},

	methods: {
		hideObjects() {
			this.objectShow = false
		},
		hideDistricts() {
			this.districtShow = false
		},
		districtsUncheck() {
			this.isUnCheckAll = false;
		},
		objectsUncheck() {
			this.isUnCheckAllObjects = false;
		},
		sortByCategories() {
			let vm = this;
			this.sortedProducts = this.flats
			this.filtered = true
			this.sortedProducts = this.sortedProducts.filter(function (item) {
				return (item.area >= vm.valueArea[0] && item.area <= vm.valueArea[1]) &&
					(vm.plinthParam.length === 0 || vm.plinthParam.includes(item.plinth)) &&
					(vm.bathroom.length === 0 || vm.bathroom.includes('all') || vm.bathroom.includes(item.bathroom)) &&
					(vm.stainedGlass.length === 0 || vm.stainedGlass.includes(item.stainedGlass)) &&
					(vm.separateSntrance.length === 0 || vm.separateSntrance.includes(item.separateSntrance)) &&
					(vm.video.length === 0 || vm.video.includes(item.video)) &&
					(vm.loadingEntrance.length === 0 || vm.loadingEntrance.includes(item.loadingEntrance)) &&
					(vm.districts.length === 0 || vm.districts.includes('all') || vm.districts.includes(item.districts)) &&
					(vm.selectedObjects.length === 0 || vm.selectedObjects.includes('all') || vm.selectedObjects.includes(item.objectName))
			})
			if (this.sortedProducts.length === 0) {
				this.errorText = true
			} else {
				this.errorText = false
			}

		},
		resetFilters() {
			this.uncheckAll();
			this.uncheckAllObjects();
			this.filtered = false;
			this.errorText = false;
			this.plinthParam = [];
			this.districts = [];
			this.bathroom = [];
			this.stainedGlass = [];
			this.separateSntrance = [];
			this.video = [];
			this.loadingEntrance = [];
			this.selectedObjects = []
		},
		moreParameters() {
			this.filterAddinations = !this.filterAddinations
		},
		uncheckAll: function () {
			this.isUnCheckAll = true;
			if (this.isUnCheckAll) {
				this.districts = [];
			}
		},
		uncheckAllObjects: function () {
			this.isUnCheckAllObjects = true;
			if (this.isUnCheckAllObjects) {
				this.selectedObjects = [];
			}
		},
		onSubmit() {
			this.sortByCategories();
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
		},
		openPopupGallery(item, index){
			this.$emit('open-gallery', item, index)
		},
		selectObjectOut() {
			this.modalVisible = false
			if (this.newObject) {
				this.selectedObjects = this.newObject            
				this.objectsUncheck()
			}
			this.sortByCategories()
		},
		reInit() {
			this.$nextTick(() => {
				this.$refs.slick.reSlick();
				this.$refs.slickNav.reSlick();
			});
		},
		handleBeforeChange(event, slick, currentSlide) {
			$('.projects-slider .slick-slide[data-slick-index="' + currentSlide + '"]').addClass('closed');
		},
		handleAfterChange(event, slick, currentSlide) {
			let prev = currentSlide - 1
			$('.projects-slider .slick-slide[data-slick-index="' + prev + '"]').removeClass('closed');
		},
		openModal(item) {
			this.popupTitle = item.name,
			this.popupAddress = item.address,
			this.popupGallery = item.gallery,
			this.delivery = item.delivery,
			this.coords = item.coords,
			this.aboutText = item.text,
			this.aboutText2 = item.text2,
			this.infrastructure = item.infrastructure,
			this.advantage = item.advantage,
			this.objectName = item.objectName,
			this.modalVisible = true
		},

	},
	computed: {
		filteredProducts() {
			if (this.filtered === true) {
				return this.sortedProducts
			} else {
				return this.flats
			}
		},
	},
	watch: {
		valueArea: function (val) {
			this.valueArea = val
		},
		popupGallery: function () {
			this.$refs.slick.destroy()
			this.$refs.slickNav.destroy()
			this.$nextTick(() => {
				this.$refs.slick.create()
				this.$refs.slickNav.create()
			})
		},
		objectName: function(new_value) {
			this.newObject.length = 0, 
			this.newObject.push(new_value)
		}
		
	},
	mounted() {
		let vm = this
		
		

		

		var sliderArea = vm.$refs.sliderArea
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
		

		$('.button-reset').on('click', () => {
			sliderArea.noUiSlider.reset()
		});

		sliderArea.noUiSlider.on('update', function (values) {
			vm.valueArea = values
		});
		

	},
	events: {
		closeEvent() {
		this.hide()
		}
	}
}

</script>

<style src="./Catalog.sass" lang="sass"></style>
<style src="./Projects.sass" lang="sass"></style>