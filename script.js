// 1. Seleccionar los elementos del HTML
const iaForm = document.getElementById('ia-form');
const submitButton = document.getElementById('submit-button');
const loadingIndicator = document.getElementById('loading');
const resultContainer = document.getElementById('result-container');
const resultImage = document.getElementById('result-image');

// 2. Escuchar el envío del formulario
iaForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // 3. Preparar la interfaz
    resultContainer.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    submitButton.disabled = true;

    // 4. Recolectar los datos y construir el prompt
    const eventType = document.getElementById('event-type').value;
    const colors = document.getElementById('colors').value;
    const style = document.getElementById('style').value;
    const extraDetails = document.getElementById('extra-details').value;

    const prompt = `Una fotografía profesional de alta calidad de una decoración con globos para ${eventType}, con un estilo ${style}. La paleta de colores principal es ${colors}. Detalles específicos: ${extraDetails}.`;
    
    // --- ¡AQUÍ ESTÁ LA MAGIA! LLAMADA REAL AL BACKEND ---
    try {
        // 5. Enviar el prompt a nuestro backend en la ruta /api/generate
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
            throw new Error('Algo salió mal al contactar al servidor.');
        }

        const data = await response.json();
        
        // 6. Mostrar la imagen recibida desde el backend
        resultImage.src = data.imageUrl;
        resultImage.alt = prompt; // Usar el prompt como texto alternativo
        resultContainer.classList.remove('hidden');

    } catch (error) {
        // 7. Si hay un error, mostrarlo en la consola y al usuario
        console.error("Error:", error);
        alert("Hubo un error al generar tu diseño. Por favor, inténtalo de nuevo.");
    } finally {
        // 8. Limpiar la interfaz sin importar si hubo éxito o error
        loadingIndicator.classList.add('hidden');
        submitButton.disabled = false;
    }
});
