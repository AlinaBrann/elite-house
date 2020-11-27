<template>
    <div 
        class="popup booking-popup" 
        >
        <div class="popup-back-closer" @click="$emit('close-modal')"></div>
        <div class="popup-content booking-popup__content" >
            <div class="popup-body">
                <button @click="$emit('close-modal')" class="popup-closer"></button>
                <div class="popup__title booking-popup__title">Бронь помещения</div>
                <div class="booking-popup-info">
                    <div class="booking-popup-info__item">
                        <div class="booking-popup-info__item-title">Цена</div>
                        <div class="booking-popup-info__item-border"></div>
                        <div class="booking-popup-info__value">$ {{ price | currency }}</div>
                    </div>
                    <div class="booking-popup-info__item">
                        <div class="booking-popup-info__item-title">Помещение</div>
                        <div class="booking-popup-info__item-border"></div>
                        <div class="booking-popup-info__value">{{ title }}</div>
                    </div>
                    <div class="booking-popup-info__item">
                        <div class="booking-popup-info__item-title">Площадь</div>
                        <div class="booking-popup-info__item-border"></div>
                        <div class="booking-popup-info__value">{{ area }} m<sup>2</sup></div>
                    </div>
                </div>                
                <div class="booking-popup__text">
                    Оставьте нам ваш номер телефона и&nbsp;менеджер свяжется 
                    <br>с&nbsp;вами в&nbsp;ближайшее время
                </div>

                <FeedbackForm 
                    class="popup-feedback-form"
                    name="bookingFeedback"
                />
            </div>
        </div>
    </div>	
</template>

<script>
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm'

export default {
    props: [
        "price",
        "area",
        "title"
    ],
    components: {
       FeedbackForm
    }
}
</script>

<style src="./PopupBooking.sass" lang="sass"></style>