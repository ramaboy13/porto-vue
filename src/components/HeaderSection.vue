<template>
    <header>
        <a href="#" class="logo">B<span>S</span>R</a>

        <div class="bx bx-menu" id="menu-icon"></div>
        <ul class="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="theme-toggle">
            <button id="toggle-dark-mode" type="button">
                <i class="ri-moon-fill active"></i> <i class="ri-sun-fill"></i>
            </button>
        </div>
    </header>
</template>

<script setup>
    import {
        onMounted,
        onUnmounted
    } from 'vue';

    // Gunakan onMounted untuk memastikan DOM sudah siap
    onMounted(() => {
        // Header scroll effect dan mobile menu handling
        const header = document.querySelector("header");
        let menu = document.querySelector("#menu-icon");
        let navlist = document.querySelector(".nav-list");

        // Fungsi untuk menangani scroll event
        const handleScroll = () => {
            // Tambahkan class sticky ke header
            if (header) {
                header.classList.toggle("sticky", window.scrollY > 120);
            }

            // Tutup menu mobile saat scrolling
            if (menu) {
                menu.classList.remove("bx-x");
                navlist.classList.remove("active");
            }
        };

        // Tambahkan event listener untuk scroll
        window.addEventListener("scroll", handleScroll);

        // Mobile menu toggle
        if (menu) {
            menu.onclick = () => {
                menu.classList.toggle("bx-x");
                navlist.classList.toggle("active");
            };
        }

        // Bersihkan event listener saat komponen dihapus
        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
        });
    });
</script>
