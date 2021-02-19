<template>
    <div class="popup popup-offer" >
        <div class="popup-back-closer" @click="$emit('close')"></div>
        <div class="popup-offer__head">
            <div class="popup-offer-total">
                <div class="popup-offer-total__item">{{ current }}</div>
                <div class="popup-offer-total__item _sep">/</div>
                <div class="popup-offer-total__item">{{ slides.length }}</div>
            </div>
            <button @click="$emit('close')" class="popup-closer"></button>
        </div>
        <div class="popup-content popup-offer__content" >
            <div class="popup__title">Индивидуальное предложенние</div>
            <form  @submit.prevent="checkForm">
                <Slick
                    :options="settings"
                    @beforeChange="handleAfterChange"
                    class="popup-offer-slider">
                    <div class="popup-offer-slide" v-for="(slide, index) in slides" :key="index">
                        
                        <div class="popup-offer-slide__title" v-html="slide.title"></div>
                        <div class="popup-offer-checkboxes" v-if="slide.checkboxes">
                            <div class="popup-offer-checkbox" 
                                v-for="(item, index) in slide.checkboxes" 
                                :key="item">
                                <input type="checkbox" :value="slide.checkboxesName + (index + 1)" :id="slide.checkboxesName + (index + 1)" class="popup-offer-checkbox__input">
                                <label :for="slide.checkboxesName + (index + 1)" class="popup-offer-checkbox__label">{{ item }}</label>
                            </div>
                        </div>
                        <div class="filter-block popup-offer-filter-block" v-if="slide.range">
                            <div class="filter-block__title popup-offer-filter-block__title" v-html="slide.range.title"></div>
                            <div ref="sliderAreaProposalModal" class="filter-range sliderAreaProposalModal"></div>
                            <input type="hidden" name="offerAreaMin" :value="slide.range.value[0]">
                            <input type="hidden" name="offerAreaMax" :value="slide.range.value[1]">
                            <div class="filter-block__label">
                                <span>от {{ valueArea[0] | currency }}</span><span>до {{ valueArea[1] | currency }}</span>
                            </div>
                        </div>
                        <div v-if="slide.feedback" class="popup-form feedback-form">
                            <div class="feedback-form-row _v1">
                                <div class="input-wrapper feedback-form__name">
                                    <label :for="'ProposalModalFeedback' + (index + 1) + '-name'" class="input-label">Ваше имя</label>
                                    <input type="text" v-model="nameInput" :id="'ProposalModalFeedback' + (index + 1) + '-name'" class="input">
                                </div>
                                <div class="input-wrapper feedback-form__phone" :class="{'_error': errors}">
                                    <label :for="'ProposalModalFeedback' + (index + 1) + '-phone'" class="input-label">Номер телефона</label>
                                    <input 
                                        type="tel" 
                                        :id="'ProposalModalFeedback' + (index + 1) + '-phone'" 
                                        v-model="phone"
                                        class="input">
                                    <transition name="fade">
                                        <div v-show="errors" class="input-error">{{ errors }}</div>
                                    </transition>
                                </div>
                            </div>
                            <div class="feedback-form-row _v2">
                                <input type="submit" class="feedback-form__button button" value="Перезвоните мне">
                                <div class="feedback-privacy">
                                    Нажимая на кнопку «Перезвоните мне» вы соглашаетесь <br>с 
                                    <a href="/privacy-policy.pdf" target="_blank">политикой конфиденциальности</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slick>
            </form>
            <button class="popup-offer-slider__next button">Далее</button>
        </div>
    </div>  
</template>

<script>
import Slick from 'vue-slick';
import Offer from '@/assets/data.json'
import 'nouislider/distribute/nouislider.css'
import noUiSlider from 'nouislider'

export default {
    data() {
        return {
            current: 1,
            settings: {
                arrows: true,
                fade: true,
                infinite: false,
                draggable: false,
                nextArrow: '.popup-offer-slider__next',
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            adaptiveHeight: true
                        }
                    }
                ]
            },
            slides: Offer.offer,
            valueArea: [30, 100],
            minArea: 0,
            maxArea: 200,
            errors: '',
            phone: null,
            nameInput: ''
        }
    },
    components: {
        Slick
    },
    methods: {
        handleAfterChange(event, slick, currentSlide) {
            this.current = currentSlide + 2
            
        },
        checkForm: function (e) {
            if (!this.phone && !this.validEmail(this.phone)) {
                this.errors = 'Укажите номер телефона.';
            } else if (this.phone && !this.validEmail(this.phone)) {
                this.errors = 'Укажите корректный номер телефона.';
            } else {
                this.errors = ''
            }
            if (!this.errors) {
                this.$emit('openPopupThanks')
                e.preventDefault();
                return true;
            }
            
        },
        validEmail: function (phone) {
            var re = /^[+]?[0-9]{9,12}$/;
            return re.test(phone);
        }
    },
    mounted() {
		let vm = this
        var sliderAreaProposalModal = document.getElementsByClassName('sliderAreaProposalModal')[0]
        noUiSlider.create(
            sliderAreaProposalModal, {
                start: vm.valueArea,
                connect: true,
                range: {
                    'min': vm.minArea,
                    'max': vm.maxArea
                }
            }
        );
        
        sliderAreaProposalModal.noUiSlider.on('update', function (values) {
            vm.valueArea = values
        });
	}
}
</script>

<style src="./PopupProposal.sass" lang="sass"></style>