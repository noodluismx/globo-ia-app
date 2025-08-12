// 1. Seleccionar los elementos del HTML
const iaForm = document.getElementById('ia-form');
const submitButton = document.getElementById('submit-button');
const loadingIndicator = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
// NOTA: Asegúrate de que tu HTML tenga un elemento <p id="result-text"></p>
const resultText = document.getElementById('result-text');

// 2. Escuchar el envío del formulario
iaForm.addEventListener('submit', async (event) => {
    // Evita que la página se recargue
    event.preventDefault();

    // 3. Preparar la interfaz para la carga
    resultContainer.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    submitButton.disabled = true;
    resultText.textContent = ''; // Limpiar el texto anterior

    // 4. Recolectar los datos del formulario y construir el prompt
    const eventType = document.getElementById('event-type').value;
    const colors = document.getElementById('colors').value;
    const style = document.getElementById('style').value;
    const extraDetails = document.getElementById('extra-details').value;

    const prompt = `Una fotografía profesional de alta calidad de una decoración con globos para ${eventType}, con un estilo ${style}. La paleta de colores principal es ${colors}. Detalles específicos: ${extraDetails}.`;
    
    // --- LLAMADA AL BACKEND (API) ---
    try {
        // 5. Enviar el prompt a nuestro backend en la ruta /api/generate
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        // Si la respuesta del servidor no es exitosa (ej: error 500)
        if (!response.ok) {
            throw new Error('La respuesta del servidor no fue exitosa.');
        }

        const data = await response.json();
        
        // 6. CAMBIO PRINCIPAL: Mostrar la descripción de texto recibida desde el backend
        resultText.textContent = data.description; // Se asigna la descripción al párrafo
        resultContainer.classList.remove('hidden'); // Se muestra el contenedor de resultados

    } catch (error) {
        // 7. Si hay un error, mostrarlo en la consola y al usuario
        console.error("Error en la solicitud:", error);
        alert("Hubo un error al generar tu diseño. Revisa la consola para más detalles.");
    } finally {
        // 8. Limpiar la interfaz sin importar si hubo éxito o error
        loadingIndicator.classList.add('hidden');
        submitButton.disabled = false;
    }
});
