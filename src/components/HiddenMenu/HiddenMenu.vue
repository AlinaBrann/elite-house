<template>
    <div class="hidden-menu">        
        <div class="container">
            <div class="hidden-menu-content">
                <ul class="hidden-menu-nav">
                    <li 
                        v-for="item in menu"
                        :key="item.name"
                        class="hidden-menu-nav__item animated-link"
                        >
                        <a 
                            @click="$emit('round-position', $event); $emit('open-menu');" 
                            :href="item.path"
                            v-smooth-scroll="{ duration: 2000,  offset: -143 }"
                            >
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
                <div class="header-menu-wrapper">
                    <ul class="header-menu hidden-menu-menu">
                        <li class="header-menu__item hidden-menu-menu__item animated-link" @click="$emit('open-special');">
                            Специальные предложения
                        </li>
                        <li class="header-menu__item hidden-menu-menu__item animated-link">
                            <a href="#catalog" v-smooth-scroll="{ duration: 2000, offset: 2 }" >Выбрать помещения</a>
                        </li>
                    </ul>
                </div>
                <div class="hidden-menu-info">
                    <a :href="'tel:' + phone" class="hidden-menu-info__phone">{{ phone }}</a>
                    <div class="hidden-menu-info__title">Адрес</div>
                    <div class="hidden-menu-info__address">{{ address }}</div>
                    <a :href="'mailto:' + mail" class="hidden-menu-info__mail">{{ mail }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Content from'@/assets/data.json'

export default {
    data() {
        return {
            menu: Content.menu,
            phone: Content.phone,
            address: Content.address,
            mail: Content.mail,
            feedback: Content.feedback
        }
    }
}
</script>

<style src="./HiddenMenu.sass" lang="sass"></style>