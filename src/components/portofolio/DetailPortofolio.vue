<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import projectData from '../../assets/data/dataportofolio.json';

const route = useRoute();
const router = useRouter();
const project = ref(null);
const isLoading = ref(true);
const isImageLoaded = ref(false);

onMounted(() => {
    // Tambahkan delay kecil untuk efek loading
    setTimeout(() => {
        const projectId = parseInt(route.params.id);
        const foundProject = projectData.find(p => p.id === projectId);

        if (foundProject) {
            project.value = foundProject;
        } else {
            router.push('/');
        }
        isLoading.value = false;
    }, 800);
});

const goBack = () => {
    router.push('/');
    setTimeout(() => {
        router.go(0);
    }, 100);
};

const imageLoaded = () => {
    isImageLoaded.value = true;
};
</script>

<template>
    <div class="detail-portofolio">
        <header class="project-header-nav">
            <a href="#" class="logo" @click="goBack">
                <i class="ri-code-s-slash-line"></i> B<span>S</span>R
            </a>
            <button @click="goBack" class="back-button-nav">
                <i class="ri-arrow-left-line"></i> Kembali
            </button>
        </header>

        <div v-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Memuat proyek...</p>
        </div>

        <div class="container" v-else-if="project" :class="{ 'fade-in': !isLoading }">
            <div class="project-header">
                <h1><i class="ri-folder-open-fill"></i> {{ project.judul }}</h1>
                <div class="project-meta">
                    <span><i class="ri-calendar-line"></i> Dibuat pada: {{ project.tanggal_rilis }}</span>
                    <span class="divider">|</span>
                    <span><i class="ri-flag-line"></i> Status: 
                        <span :class="project.status === 'Selesai' ? 'status-completed' : 'status-progress'">
                            {{ project.status }}
                        </span>
                    </span>
                </div>
            </div>

            <div class="project-image" :class="{ 'image-loaded': isImageLoaded }">
                <img :src="project.gambar" :alt="project.judul" @load="imageLoaded" />
                <div class="image-overlay">
                    <span class="view-project"><i class="ri-eye-line"></i> Lihat Proyek</span>
                </div>
            </div>

            <div class="project-content">
                <div class="project-description content-section">
                    <h2><i class="ri-file-text-line"></i> Deskripsi Proyek</h2>
                    <p>{{ project.deskripsi_lengkap }}</p>
                </div>

                <div class="project-features content-section">
                    <h2><i class="ri-star-line"></i> Fitur Utama</h2>
                    <ul>
                        <li v-for="(fitur, index) in project.fitur_utama" :key="index">
                            <i class="ri-check-line"></i> {{ fitur }}
                        </li>
                    </ul>
                </div>

                <div class="project-technologies content-section">
                    <h2><i class="ri-tools-line"></i> Teknologi</h2>
                    <div class="tech-tags">
                        <span v-for="(tech, index) in project.teknologi" :key="index" class="tech-tag">
                            {{ tech }}
                        </span>
                    </div>
                </div>

                <div class="project-contributors content-section">
                    <h2><i class="ri-team-line"></i> Kontributor</h2>
                    <ul>
                        <li v-for="(contributor, index) in project.kontributor" :key="index">
                            <i class="ri-user-line"></i> {{ contributor }}
                        </li>
                    </ul>
                </div>

                <div class="project-screenshots content-section">
                    <h2><i class="ri-image-line"></i> Screenshot</h2>
                    <div class="screenshot-grid">
                        <div v-for="(screenshot, index) in project.screenshot" :key="index" class="screenshot-item">
                            <img :src="screenshot" :alt="'Screenshot ' + (index + 1)" />
                            <div class="screenshot-overlay">
                                <span><i class="ri-zoom-in-line"></i></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="project-link content-section">
                    <h2><i class="ri-link"></i> Link Proyek</h2>
                    <a :href="project.url" target="_blank" class="btn primary-btn">
                        <i class="ri-external-link-line"></i> Lihat Proyek
                    </a>
                    <a href="#" class="btn secondary-btn" @click.prevent="goBack">
                        <i class="ri-arrow-go-back-line"></i> Kembali ke Portofolio
                    </a>
                </div>
            </div>
        </div>

        <div v-else class="not-found">
            <i class="ri-error-warning-line"></i>
            <h2>Proyek tidak ditemukan</h2>
            <p>Maaf, proyek yang Anda cari tidak tersedia.</p>
            <button @click="goBack" class="btn">Kembali ke Beranda</button>
        </div>
    </div>
</template>

<style scoped>
/* Impor font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

/* Variabel */
:root {
    --main-color: #6366f1;
    --hover-color: #4f46e5;
    --text-color: #333;
    --text-secondary: #666;
    --bg-color: #f8f9fa;
    --card-bg: #ffffff;
    --border-radius: 12px;
    --box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    --transition: all 0.3s ease;
}

/* Animasi */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

/* Base styles */
.detail-portofolio {
    padding-top: 80px;
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-color);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    opacity: 0;
}

.fade-in {
    animation: fadeIn 0.8s ease forwards;
}

/* Header */
.project-header-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--card-bg);
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
}

.logo {
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: var(--transition);
}

.logo:hover {
    color: var(--main-color);
    transform: scale(1.05);
}

.logo span {
    color: var(--main-color);
}

.back-button-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: transparent;
    color: var(--text-color);
    border: none;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: var(--transition);
}

.back-button-nav:hover {
    color: var(--main-color);
}

/* Project Header */
.project-header {
    margin-bottom: 3rem;
    text-align: center;
}

.project-header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.project-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
}

.divider {
    margin: 0 1rem;
}

.status-completed {
    color: #10b981;
    font-weight: 600;
}

.status-progress {
    color: #f59e0b;
    font-weight: 600;
}

/* Project Image */
.project-image {
    margin-bottom: 3rem;
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    opacity: 0;
    transform: translateY(20px);
    transition: var(--transition);
}

.project-image.image-loaded {
    opacity: 1;
    transform: translateY(0);
}

.project-image img {
    width: 100%;
    height: auto;
    display: block;
    transition: var(--transition);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: var(--transition);
}

.project-image:hover .image-overlay {
    opacity: 1;
}

.project-image:hover img {
    transform: scale(1.05);
}

.view-project {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Content Sections */
.content-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background-color: var(--card-bg);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
}

.content-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.content-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
}

/* Project Description */
.project-description p {
    line-height: 1.8;
    color: var(--text-secondary);
}

/* Project Features */
.project-features ul,
.project-contributors ul {
    list-style: none;
    padding-left: 0;
}

.project-features li,
.project-contributors li {
    margin-bottom: 0.75rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

.project-features li i,
.project-contributors li i {
    color: var(--main-color);
    margin-top: 0.3rem;
}

/* Project Technologies */
.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.tech-tag {
    background-color: #f0f4f8;
    color: var(--main-color);
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: var(--transition);
}

.tech-tag:hover {
    background-color: var(--main-color);
    color: white;
    transform: translateY(-3px);
}

/* Project Screenshots */
.screenshot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.screenshot-item {
    border-radius: var(--border-radius);
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
}

.screenshot-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.screenshot-item img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    transition: var(--transition);
}

.screenshot-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: var(--transition);
}

.screenshot-item:hover .screenshot-overlay {
    opacity: 1;
}

.screenshot-item:hover img {
    transform: scale(1.1);
}

.screenshot-overlay span {
    color: white;
    font-size: 1.5rem;
}

/* Project Link */
.project-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.btn {
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    text-decoration: none;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    min-width: 180px;
    justify-content: center;
}

.primary-btn {
    background-color: var(--main-color);
    color: white;
}

.primary-btn:hover {
    background-color: var(--hover-color);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.secondary-btn {
    background-color: transparent;
    color: var(--text-color);
    border: 2px solid var(--main-color);
}

.secondary-btn:hover {
    background-color: rgba(99, 102, 241, 0.1);
    transform: translateY(-3px);
}

/* Loading */
.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 1.5rem;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(99, 102, 241, 0.2);
    border-top: 5px solid var(--main-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-container p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Not Found */
.not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 1rem;
    text-align: center;
    animation: fadeIn 0.8s ease forwards;
}

.not-found i {
    font-size: 4rem;
    color: #ef4444;
    margin-bottom: 1rem;
}

.not-found h2 {
    font-size: 2rem;
    color: var(--text-color);
}

.not-found p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
    .project-header h1 {
        font-size: 2rem;
    }
    
    .project-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .divider {
        display: none;
    }
    
    .content-section {
        padding: 1.5rem;
    }
    
    .screenshot-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .project-link {
        flex-direction: column;
        width: 100%;
    }
    
    .btn {
        width: 100%;
    }
}

/* Hover effects and animations for additional elements */
.content-section i {
    transition: var(--transition);
}

.content-section:hover i {
    transform: scale(1.2);
    color: var(--main-color);
}

/* Add pulse animation to status labels */
.status-completed, .status-progress {
    display: inline-block;
    animation: pulse 2s infinite;
}
</style>