<script setup>
    import {
        ref,
        onMounted
    } from 'vue';
    import {
        useRoute,
        useRouter
    } from 'vue-router';
    import projectData from '../../assets/data/dataportofolio.json';

    const route = useRoute();
    const router = useRouter();
    const project = ref(null);

    onMounted(() => {
        const projectId = parseInt(route.params.id);
        const foundProject = projectData.find(p => p.id === projectId);

        if (foundProject) {
            project.value = foundProject;
        } else {
            // Handle project not found
            router.push('/');
        }
    });

    const goBack = () => {
    router.push('/');
    setTimeout(() => {
        router.go(0); // 0 berarti refresh halaman saat ini
    }, 100); // Tambahkan delay kecil untuk memastikan navigasi selesai
};
</script>

<template>
    <div class="detail-portofolio">
      <header>
        <a href="#" class="logo" @click="goBack">B<span>S</span>R</a>
      </header>
  
      <div class="container" v-if="project">
        <div class="project-header">
          <h1>{{ project.judul }}</h1>
          <p class="project-meta">Dibuat pada: {{ project.tanggal_rilis }} | Status: {{ project.status }}</p>
        </div>
        
        <div class="project-image">
          <img :src="project.gambar" :alt="project.judul" />
        </div>
  
        <div class="project-content">
          <div class="project-description">
            <h2>Deskripsi Proyek</h2>
            <p>{{ project.deskripsi_lengkap }}</p>
          </div>
  
          <div class="project-features">
            <h2>Fitur Utama</h2>
            <ul>
              <li v-for="(fitur, index) in project.fitur_utama" :key="index">{{ fitur }}</li>
            </ul>
          </div>
  
          <div class="project-technologies">
            <h2>Teknologi</h2>
            <ul>
              <li v-for="(tech, index) in project.teknologi" :key="index">{{ tech }}</li>
            </ul>
          </div>
  
          <div class="project-contributors">
            <h2>Kontributor</h2>
            <ul>
              <li v-for="(contributor, index) in project.kontributor" :key="index">{{ contributor }}</li>
            </ul>
          </div>
  
          <div class="project-screenshots">
            <h2>Screenshot</h2>
            <div class="screenshot-grid">
              <img v-for="(screenshot, index) in project.screenshot" :key="index" :src="screenshot" :alt="'Screenshot ' + (index + 1)" />
            </div>
          </div>
  
          <div class="project-link">
            <h2>Link Proyek</h2>
            <a :href="project.url" target="_blank" class="btn">Lihat Proyek</a>
          </div>
        </div>
  
        <div class="back-button">
          <button @click="goBack" class="btn">Kembali</button>
        </div>
      </div>
  
      <div v-else class="loading">
        Loading...
      </div>
    </div>
  </template>


<style scoped>
.detail-portofolio {
  padding-top: 100px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.project-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.project-meta {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.project-image {
  margin-bottom: 2rem;
  text-align: center;
}

.project-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.project-content {
  margin-bottom: 2rem;
}

.project-description,
.project-features,
.project-technologies,
.project-contributors,
.project-screenshots,
.project-link {
  margin-bottom: 2rem;
}

.project-description h2,
.project-features h2,
.project-technologies h2,
.project-contributors h2,
.project-screenshots h2,
.project-link h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-technologies ul,
.project-features ul,
.project-contributors ul {
  list-style: disc;
  padding-left: 2rem;
}

.project-technologies li,
.project-features li,
.project-contributors li {
  margin-bottom: 0.5rem;
}

.screenshot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.screenshot-grid img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.back-button {
  text-align: center;
  margin-top: 2rem;
}

.btn {
  background-color: var(--main-color);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: var(--hover-color);
  transform: translateY(-3px);
}

.loading {
  text-align: center;
  padding: 5rem;
  font-size: 1.5rem;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.logo:hover {
  color: var(--main-color);
}

.logo span {
  color: var(--main-color);
}
</style>