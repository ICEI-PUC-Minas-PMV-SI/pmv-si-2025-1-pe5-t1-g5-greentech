FROM python:3

WORKDIR /app

# Escreve um servidor HTTP customizado que responde com "Olá da Matriz!!"
RUN echo "from http.server import BaseHTTPRequestHandler, HTTPServer\n\
\n\
class Handler(BaseHTTPRequestHandler):\n\
    def do_GET(self):\n\
        self.send_response(200)\n\
        self.send_header('Content-type', 'text/plain; charset=utf-8')\n\
        self.end_headers()\n\
        self.wfile.write('Olá da API da Matriz!!'.encode('utf-8'))\n\
\n\
if __name__ == '__main__':\n\
    server = HTTPServer(('0.0.0.0', 8030), Handler)\n\
    server.serve_forever()" > server.py

CMD ["python", "server.py"]
