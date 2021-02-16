<template>
    <div class="popup popup-feedback">
        <div class="popup-back-closer" @click="$emit('close-modal')"></div>
        <div class="popup-content popup-feedback__content" >
            <div class="popup__title">{{ feedback.title }}</div>
            <div class="popup__text" v-html="feedback.text"></div>
            <FeedbackForm 
                class="popup-feedback-form"
                name="headerFeedback"
                @openPopupThanks="openPopupThanks"
            />
        </div>
    </div>     
</template>

<script>
import Feedback from '@/assets/data.json'
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm'

export default {
    data() {
        return {
            feedback: Feedback.feedback
        }
    },
    components: {
       FeedbackForm
    },
    methods: {
        openPopupThanks() {
            this.$emit('openPopupThanks')
        },
    }
}
</script>