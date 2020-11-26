<template>
    <footer class="contacts" id="contacts">
        <div class="contacts-map" style="z-index:0">
            <yandex-map 
                :coords="[42.884411, 74.603386]" 
                :scrollZoom="false" 
                :zoom="zoom"
                style="width: 100vw; height: 100%;">
                <ymap-marker 
                marker-id="123" 
                :coords="contacts.coords"
                :icon="markerIcon"
                
                />
            </yandex-map>
            <button 
                :class="{'_disabled': zoom >= 21}"
                class="contacts-map-controls _plus" 
                @click="zoomIn()">
                <svg width="20" height="21" viewBox="0 0 20 21">
                    <line y1="10.6367" x2="20" y2="10.6367" stroke-width="2"/>
                    <line x1="10" y1="0.636719" x2="10" y2="20.6367" stroke-width="2"/>
                </svg>
            </button>
            <button 
                :class="{'_disabled': zoom <= 13}"
                class="contacts-map-controls _minus" 
                @click="zoomOut()">
                <svg width="20" height="3" viewBox="0 0 20 3">
                    <line y1="1.63672" x2="20" y2="1.63672" stroke-width="2"/>
                </svg>
            </button>
        </div>
        <div class="contacts-content">
            <h2 
                class="section__title contacts__title _white" 
                v-bind:data-title="contacts.title">
                {{ contacts.title }}
            </h2>
            
            <div class="contacts-content-row">
                <div class="contacts-content-col">
                    <p>{{ contacts.smallTitle }}</p>
                    <p>{{ address }}</p>
                    <div class="contacts-content-working-time">
                        <div class="contacts-content__title _v1">Адрес</div>
                        <p v-for="(time,i) in contacts.workingTime" :key="i">{{ time }}</p>
                    </div>
                    <ul class="contacts-social">
                        <li class="contacts-social-item" v-for="(link,i) in contacts.social" :key="i">
                            <a 
                                :class="'contacts-social-item__link ' + '_' + link.name"
                                :href="link.link" 
                                target="_blank"></a>
                        </li>
                    </ul>
                    <div class="contacts-copyright">
                        <span>© {{year}} <a :href="contacts.site" target="_blank">ООО Elite House</a></span>
                        <span>Сайт сделали в <a :href="contacts.samolet" target="_blank">Самалёте</a></span>
                    </div>
                </div>
                <div class="contacts-content-col">
                    <div class="contacts-content__title _v2">Отдел продаж</div>
                    <a :href="'tel:' + phone" class="contacts-content__phone">{{ phone }}</a>
                    <a :href="'mailto:' + mail" class="contacts-content__mail">{{ mail }}</a>
                    <button class="button" @click="$emit('open-feedback'); $emit('round-position', $event);">оставить заявку</button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import Contacts from '@/assets/data.json'
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
    data() {
        return {
            zoom: 15,
            phonePopup: false,
            contacts: Contacts.contacts,
            feedback: Contacts.feedback,
            phone: Contacts.phone,
            address: Contacts.address,
            mail: Contacts.mail,
            year: new Date().getFullYear(),
            markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: '/images/marker.svg',
                imageSize: [42, 78],
                imageOffset: [0, -40],
                contentLayout: '<div style="background: red; width: 50px; color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            }
        }
    },
    components: {
        yandexMap, 
        ymapMarker,
    },
    methods: {
        zoomIn() {
            this.zoom += 1
            
            console.log(this.zoom);
        },
        zoomOut() {
            this.zoom -= 1
            
            console.log(this.zoom);
        }
    }
}
</script>

<style src="./Contacts.sass" lang="sass"></style>