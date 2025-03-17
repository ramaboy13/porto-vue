<template>
    <section class="portofolio" id="projects">
      <div class="center-text" data-aos="fade-down">
        <h2>My <span>Portofolio</span></h2>
      </div>
  
      <div class="portofolio-content" data-aos="zoom-in-up">
        <div v-for="project in projects" :key="project.id" class="row" @click="navigateToDetail(project.id)">
          <img :src="project.gambar" :alt="project.judul" style="height: 200px" />
          <div class="main-row">
            <div class="row-text"></div>
            <div class="row-icon"></div>
          </div>
          <h4 class="row-h">{{ project.judul }}</h4>
          <p class="row-p">{{ project.deskripsi }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import projectData from '../assets/data/dataportofolio.json';
  
  const router = useRouter();
  const projects = ref([]);
  
  onMounted(() => {
    // Load data from JSON
    projects.value = projectData;
  });
  
  const navigateToDetail = (projectId) => {
    router.push({ 
      name: 'DetailPortofolio', 
      params: { id: projectId } 
    });
  };
  </script>
  