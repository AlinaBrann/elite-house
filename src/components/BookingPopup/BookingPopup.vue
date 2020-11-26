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
                    <div class="booking-popup-info__item">$ {{ price | currency }}</div>
                    <div class="booking-popup-info__item">{{ title }}</div>
                    <div class="booking-popup-info__item">{{ area }} m<sup>2</sup></div>
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

<style src="./BookingPopup.sass" lang="sass"></style>