// 1. Seleccionar los elementos del HTML con los que vamos a trabajar
const iaForm = document.getElementById('ia-form');
const submitButton = document.getElementById('submit-button');
const loadingIndicator = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const resultImage = document.getElementById('result-image');

// 2. Escuchar cuando el usuario hace clic en el botón "Generar Diseño"
iaForm.addEventListener('submit', (event) => {
    // Prevenir que la página se recargue, que es el comportamiento por defecto de un formulario
    event.preventDefault();

    // 3. Preparar la interfaz para la generación
    resultContainer.classList.add('hidden'); // Ocultar resultados anteriores
    loadingIndicator.classList.remove('hidden'); // Mostrar el indicador de carga
    submitButton.disabled = true; // Desactivar el botón para evitar múltiples clics

    // 4. Recolectar los datos del formulario
    const eventType = document.getElementById('event-type').value;
    const colors = document.getElementById('colors').value;
    const style = document.getElementById('style').value;
    const extraDetails = document.getElementById('extra-details').value;

    // 5. Construir el "prompt" o instrucción para la IA (¡Esta es la parte clave!)
    const prompt = `Una fotografía de una decoración con globos para ${eventType}, 
    con un estilo ${style}. La paleta de colores principal es ${colors}. 
    Detalles específicos: ${extraDetails}. El diseño debe ser profesional y visualmente atractivo.`;
    
    console.log("Prompt generado para la IA:", prompt); // Para que veas en la consola lo que se creó

    // --- SIMULACIÓN DE LLAMADA A LA IA ---
    // En el siguiente paso, reemplazaremos esto con una llamada real al backend.
    // Usamos setTimeout para simular que la IA está "pensando" durante 3 segundos.
    setTimeout(() => {
        // 6. Mostrar los resultados (con una imagen de prueba por ahora)
        resultImage.src = 'https://i.imgur.com/gA0y3eR.jpeg'; // URL de una imagen de prueba
        resultImage.alt = "Imagen de prueba de decoración con globos";
        
        // 7. Actualizar la interfaz para mostrar el resultado
        loadingIndicator.classList.add('hidden'); // Ocultar el indicador de carga
        resultContainer.classList.remove('hidden'); // Mostrar el contenedor de resultados
        submitButton.disabled = false; // Reactivar el botón
    }, 3000); // 3000 milisegundos = 3 segundos
});
