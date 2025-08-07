import os
import json
import requests
from http.server import BaseHTTPRequestHandler

# Esta es la clase que Vercel usará para ejecutar nuestra función
class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        # 1. Leer el prompt que nos envía el frontend
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        prompt = data.get('prompt')

        # 2. Obtener la clave de API secreta (la configuraremos en Vercel)
        api_key = os.getenv('DEEPAI_API_KEY')

        # 3. Preparar y enviar la petición a la API de DeepAI
        try:
            r = requests.post(
                "https://api.deepai.org/api/text2img",
                data={
                    'text': prompt,
                },
                headers={'api-key': api_key}
            )
            
            # Obtener la URL de la imagen de la respuesta de DeepAI
            image_url = r.json()['output_url']

            # 4. Enviar una respuesta exitosa al frontend con la URL de la imagen
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'imageUrl': image_url}
            self.wfile.write(json.dumps(response).encode('utf-8'))

        except Exception as e:
            # 5. Si algo sale mal, enviar una respuesta de error
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_response = {'error': str(e)}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
            
        return
