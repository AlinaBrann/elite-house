<template>
    <form class="popup-form feedback-form">
        <div class="feedback-form-row _v1">
            <div class="input-wrapper feedback-form__name">
                <label :for="name + '-name'" class="input-label">Ваше имя</label>
                <input type="text" :id="name + '-name'" class="input">
            </div>
            <div class="input-wrapper feedback-form__phone">
                <label :for="name + '-phone'" class="input-label">Номер телефона</label>
                <input type="tel" :id="name + '-phone'" class="input">
            </div>
        </div>
        <div class="feedback-form-row _v2">
            <input type="submit" class="button" value="Перезвоните мне">
            <div class="feedback-privacy">
                Нажимая на кнопку «Перезвоните мне» вы соглашаетесь <br>с 
                <a href="">политикой конфиденциальности</a>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style src="./FeedbackForm.sass" lang="sass"></style>