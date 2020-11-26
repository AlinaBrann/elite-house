<template>
    <div 
        class="popup special-popup _dark" 
        >
        <div class="popup-back-closer" @click="$emit('close-modal')"></div>
        <div class="popup-content special-popup__content" >
            <div class="popup-body special-popup__body">
                <button @click="$emit('close-modal')" class="popup-closer"></button>
                <div class="popup__title special-popup__title" v-if="title">{{ title }}</div>
                <div class="popup__title special-popup__title" v-else>{{ content.title }}</div>
                <img 
                    class="special-popup__img"
                    v-if="image" 
                    :src="'/images/' + image" 
                    alt="">
                <img 
                    class="special-popup__img"
                    v-else
                    :src="'/images/' + content.img" 
                    alt="">
                <div class="special-popup__text" v-if="text" >
                    {{ text }}
                </div>
                <div class="special-popup__text" v-else >
                    {{ content.text }}
                </div>             
            </div>
            <div class="special-popup-form">
                <div class="special-popup-form__title">Заитересовало предложение?</div>
                <div class="special-popup-form__text">
                    Оставьте контактные данные и наш отвественный менеджер с вами свяжется! 
                </div>
                <FeedbackForm 
                    class="popup-feedback-form"
                    name="specialFeedback"
                />
            </div>
        </div>
    </div>	
</template>

<script>
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm'
import Content from '@/assets/data.json'

export default {
    props: [
        "text",
        "image",
        "title"
    ],
    data() {
        return {
            content: Content.specialPopup
        }
    },
    components: {
       FeedbackForm
    }
}
</script>

<style src="./SpecialPopup.sass" lang="sass"></style>