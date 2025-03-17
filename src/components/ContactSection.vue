<template>
    <!--Contact me-->
    <section class="contact" id="contact">
        <div class="center-text" data-aos="fade-down">
            <h2><span>Contact</span> me</h2>
        </div>

        <div class="contact-form" data-aos="zoom-in">
            <form @submit.prevent="MessageToWhatsapp">
                <input type="text" v-model="name" placeholder="Input Your name" required />
                <input type="email" v-model="email" placeholder="Input Your Email" required />
                <textarea v-model="pesan" cols="30" rows="10" placeholder="Write Message Here.."></textarea>
                <button type="submit" class="send-btn">Send Message</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

// Reactive variables untuk form
const name = ref('');
const email = ref('');
const pesan = ref('');

// WhatsApp message function for contact form
function MessageToWhatsapp() {
    const urlToWhatsapp = 
        `https://wa.me/+6285775242278?text=Halo nama saya, ${name.value}, email saya ${email.value}, ${pesan.value}`;

    window.open(urlToWhatsapp, "_blank");
}
</script>