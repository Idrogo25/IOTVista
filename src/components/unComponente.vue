

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getDataChanged_document,  getDataChanged,getDataDocument,updateData} from '@/firebase'; 

const route = useRoute();
const elementoId = ref(route.params.id);
const ejecutorId = ref(route.query.ejecutorId || null); 
const sensorId = ref(route.query.sensorId || null)
const esEjecutor = ref(false);
const nombre = ref('');
const estado = ref('');
const espacios = ref("")
const espacio = route.params.id

let elemento = ""
if(ejecutorId.value!=null){
  elemento=ejecutorId
  esEjecutor.value=true;
}else{
  elemento = sensorId

}

const callback = (ids) => {
  espacios.value = [];
  ids.forEach((doc) => {
    espacios.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
};

const recuperar=(snap)=>{
  let datos = ""
  if(esEjecutor.value){
    datos = snap.data().Ejecutores
  }else{
    datos = snap.data().Sensores
  }
  //Tenemos que dejar los datos en el mismo tipo 
  const nuevosdatos = datos.filter((el) => el.id === parseInt(elemento.value, 10));  
  if(nuevosdatos.length!=0){
    nombre.value = nuevosdatos.map((el)=>el.nombre)
    estado.value = nuevosdatos.map((el)=>el.estado)
  }else{
    console.log("No se encuentran datos")
  }
}

onMounted(async () => {
  try {
    const id = elementoId.value;
    const prueba = await getDataChanged("espacios", callback);
    const sensorDocumento = await getDataChanged_document(`espacios`, espacio, recuperar);
    if(prueba.exists()){
      console.log("El espacio existe");
    }else{
      console.error("El espacio no existe");
    }
    if (sensorDocumento.exists()) {
      const sensorData = sensorDocumento.data();
      esEjecutor.value = false;
      nombre.value = sensorData.nombre;
      estado.value = sensorData.estado;
    } else {
      // Si no se encuentra en Sensores, se busca en Ejecutores
      const ejecutorDocumento = await getDataChanged_document("Ejecutores", id);
      
      if (ejecutorDocumento.exists()) {
        const ejecutorData = ejecutorDocumento.data();
        esEjecutor.value = true;
        nombre.value = ejecutorData.nombre;
        estado.value = ejecutorData.estado;
      } else {
        console.error('El documento no existe en Sensores ni en Ejecutores');
      }
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }


});
const modificarEstadoSensor = async (id, sensorNombre, nuevoEstado) => {

  try {
   const documento = await getDataDocument(id, "espacios");
    const sensoresActuales = documento.exists() ? documento.data().Sensores || [] : [];
 
    const sensorIndex = sensoresActuales.findIndex(el => el.nombre ==sensorNombre);
 
    if (sensorIndex !== -1) {
      console.log(sensoresActuales[sensorIndex])
     sensoresActuales[sensorIndex].estado = nuevoEstado;
     await updateData(id,"espacios",  { Sensores: sensoresActuales });

    }
  } catch (error) {
    console.error(error);
  }
};

</script>


<template>
  <RouterLink to="/">Mostrar todos</RouterLink>

<div>
<p>
 Resultado para ID {{ elemento }} es {{ esEjecutor ? "Ejecutor" : "Sensor"}}
 <br>
 Nombre: {{ nombre }}
 <br>
 Estado: {{ estado }}
</p>
<img v-if="esEjecutor" class ="imagen" src="@/img/ejecutor.jpg" alt="Imagen para Ejecutor">
<img v-else class="imagen" src="@/img/sensor.jpg" alt="Imagen para Sensor">  </div>
<input v-if="!esEjecutor" type="text" v-model="nuevoEstado" placeholder="Nuevo estado">
<button v-if="!esEjecutor" class="btn btn-primary" @click="modificarEstadoSensor(elementoId, nombre, nuevoEstado)">Modifica el sensor
</button>
</template>

<style lang="scss" scoped>
</style>
