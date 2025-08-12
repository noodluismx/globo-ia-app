import os
import json
import google.generativeai as genai
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Obtener el tamaño del cuerpo de la solicitud
        content_length = int(self.headers['Content-Length'])
        # Leer el cuerpo de la solicitud
        post_data = self.rfile.read(content_length)
        
        try:
            # Decodificar el JSON recibido
            data = json.loads(post_data)
            user_prompt = data.get('prompt')

            if not user_prompt:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "No se recibió ningún prompt"}).encode())
                return

            # --- Lógica de Gemini ---
            # Configurar la API Key desde las variables de entorno
            api_key = os.getenv('GOOGLE_API_KEY')
            if not api_key:
                raise ValueError("La variable de entorno GOOGLE_API_KEY no está configurada.")
            
            genai.configure(api_key=api_key)

            # Crear el modelo
            model = genai.GenerativeModel('gemini-pro')
            
            # Generar contenido
            # Modificamos el prompt para que pida una descripción en lugar de una foto
            creative_prompt = f"Actúa como un diseñador de eventos experto. Describe con mucho detalle y de forma evocadora cómo sería la siguiente decoración. Incluye detalles sobre texturas, disposición de los globos, iluminación y el ambiente general que se crearía. La petición original es: '{user_prompt}'"
            response = model.generate_content(creative_prompt)
            
            # --- Fin de la lógica de Gemini ---

            # Preparar la respuesta JSON
            response_data = json.dumps({"description": response.text})
            
            # Enviar respuesta exitosa
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(response_data.encode())

        except Exception as e:
            # Enviar respuesta de error
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
