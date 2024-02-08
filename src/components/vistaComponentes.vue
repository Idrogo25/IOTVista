<template>
  <div>
    <div ref="elementos">
      <!-- Recorremos los espacios -->
      <h1>Te enseño todos los componentes</h1>
      <div v-for="espacio in espacios" :key="espacio.id">
        <!-- Recorremos los ejecutores -->
        <div v-for="ejecutor in espacio.Ejecutores" :key="ejecutor.id">
          <p>
            ID: {{ ejecutor.id }}<br>
            Nombre: {{ ejecutor.nombre }}<br>
            Estado: {{ ejecutor.estado }}<br>
            Se encuentra en {{ espacio.id }}<br>
            <router-link
              :to="{ name: 'elemento', params: { id: espacio.id }, query: { ejecutorId: ejecutor.id } }">Ver</router-link>
          </p>
        </div>
        <!-- Recorremos los sensores -->
        <div v-for="sensor in espacio.Sensores" :key="sensor.id">
          <p>
            ID: {{ sensor.id }}<br>
            Nombre: {{ sensor.nombre }}<br>
            Estado: {{ sensor.estado }}<br>
            Se encuentra en {{ espacio.id }}<br>
            <router-link
              :to="{ name: 'elemento', params: { id: espacio.id }, query: { sensorId: sensor.id } }">Ver</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDataChanged_collection } from '@/firebase.js';
const espacios = ref("");
onMounted(() => {
  getDataChanged_collection('espacios', (snapshot) => {
    espacios.value = snapshot.docs.map(doc => ({
      id: doc.id,
      Ejecutores: doc.data().Ejecutores || [],
      Sensores: doc.data().Sensores || [],
    }));
  });
});
</script>
