<template>
    <!--Footer-->
    <div class="footer">
        <div class="copyright">
            <p>&copy; 2024 Barito Surya Ramadhani. All rights reserved.</p>
        </div>
        <a href="#home" class="scroll-top">
            <i class="ri-arrow-up-fill"></i>
        </a>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    // Tunggu komponen di-mount ke DOM sebelum mencari elemen
    onMounted(() => {
        const scrollTopButton = document.querySelector(".scroll-top");
        
        if (scrollTopButton) {
            scrollTopButton.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            });
        }
    });
</script>