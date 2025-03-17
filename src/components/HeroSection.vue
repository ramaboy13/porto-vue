<template>
    <section class="hero" id="home">
        <div class="main-content" data-aos="zoom-out-up">
            <div class="absolute inset-0 justify-center">
                <div class="bg-shape1 bg-teal opacity-50 bg-blur"></div>
                <div class="bg-shape2 bg-teal opacity-50 bg-blur"></div>
                <div class="bg-shape1 bg-purple opacity-50 bg-blur"></div>
            </div>
            <h4>{{ line1Text }}</h4>
            <h1>{{ line2Part1Text }}<span>{{ line2Part2Text }}</span></h1>
            <p class="job">{{ line3Text }}</p>
            <div class="medsos">
                <a href="https://www.instagram.com/ramaboy_13/"><i class="ri-instagram-fill"></i></a>
                <a href="https://www.facebook.com/rama.buoys/"><i class="ri-facebook-fill"></i></a>
                <a href="https://www.linkedin.com/in/barito-surya-ramadhani-7a4942257/"><i
                        class="ri-linkedin-fill"></i></a>
                <a href="https://github.com/ramaboy13"><i class="ri-github-fill"></i></a>
            </div>
            <div class="main-btn">
                <a href="https://wa.me/+6285775242278" class="btn">Hire me</a>
                <a href="https://drive.google.com/file/d/1XsfJWaZBSmCjRaykECxxCWIjODvJ8QIa/view?usp=drive_link"
                    class="btn btn2">Download CV</a>
            </div>
        </div>
    </section>
</template>

<script setup>
    import {
        ref,
        onMounted
    } from 'vue';

    // Definisikan variabel ref untuk teks yang akan ditampilkan
    const line1Text = ref('');
    const line2Part1Text = ref('');
    const line2Part2Text = ref('');
    const line3Text = ref('');

    // Teks asli
    const text1 = "Hi, There!";
    const text2Part1 = "I'm ";
    const text2Part2 = "Barito Surya Ramadhani";
    const text3 = "Informatics Engineering Student at Mercu Buana University";

    // Fungsi untuk animasi typing
    function typeText(targetRef, text, delay = 100) {
        return new Promise((resolve) => {
            let i = 0;
            targetRef.value = '';

            function typing() {
                if (i < text.length) {
                    targetRef.value += text.charAt(i);
                    i++;
                    setTimeout(typing, delay);
                } else {
                    resolve();
                }
            }
            typing();
        });
    }

    // Jalankan animasi setelah komponen di-mount
    onMounted(async () => {
        await typeText(line1Text, text1, 100);
        await typeText(line2Part1Text, text2Part1, 100);
        await typeText(line2Part2Text, text2Part2, 100);
        await typeText(line3Text, text3, 50);
    });
</script>
