<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import HeaderSection from './components/HeaderSection.vue'
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import PortofolioSection from './components/PortofolioSection.vue';
import SkillSection from './components/SkillSection.vue';
import ToolsSection from './components/ToolsSection.vue';
import ContactSection from './components/ContactSection.vue';
import FooterSection from './components/FooterSection.vue';
const route = useRoute();

// Fungsi untuk menginisialisasi tema
function initializeTheme() {
    const toggleButton = document.getElementById("toggle-dark-mode");
    
    // Periksa apakah elemen ada
    if (!toggleButton) return;
    
    const currentTheme = localStorage.getItem("theme");

    // Reset classes
    toggleButton.querySelector(".ri-moon-fill").classList.remove("active");
    toggleButton.querySelector(".ri-sun-fill").classList.remove("active");

    if (currentTheme) {
        document.documentElement.className = currentTheme;

        if (currentTheme === "light-mode") {
            toggleButton.querySelector(".ri-sun-fill").classList.add("active");
        } else {
            toggleButton.querySelector(".ri-moon-fill").classList.add("active");
        }
    } else {
        // Default
        document.documentElement.className = "dark-mode";
        toggleButton.querySelector(".ri-moon-fill").classList.add("active");
    }

    // Event listener
    toggleButton.addEventListener("click", function() {
        if (document.documentElement.classList.contains("dark-mode")) {
            document.documentElement.className = "light-mode";
            localStorage.setItem("theme", "light-mode");
            this.querySelector(".ri-sun-fill").classList.add("active");
            this.querySelector(".ri-moon-fill").classList.remove("active");
        } else {
            document.documentElement.className = "dark-mode";
            localStorage.setItem("theme", "dark-mode");
            this.querySelector(".ri-moon-fill").classList.add("active");
            this.querySelector(".ri-sun-fill").classList.remove("active");
        }
    });
}

// Jalankan setelah DOM dirender
onMounted(() => {
    initializeTheme();
});
</script>

<template>
  <!-- Tampilkan detail portofolio jika di halaman detail, atau tampilkan halaman utama -->
  <router-view v-if="route.name === 'DetailPortofolio'" />
  
  <div v-else>
    <HeaderSection />
    <HeroSection />
    <AboutSection />
    <PortofolioSection />
    <SkillSection />
    <ToolsSection />
    <ContactSection />
    <FooterSection />
  </div>
</template>