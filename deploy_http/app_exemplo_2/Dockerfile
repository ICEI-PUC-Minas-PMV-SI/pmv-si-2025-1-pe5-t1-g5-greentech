FROM python:3

WORKDIR /app
RUN echo "from http.server import SimpleHTTPRequestHandler, HTTPServer; HTTPServer(('0.0.0.0', 8080), SimpleHTTPRequestHandler).serve_forever()" > server.py
CMD ["python", "server.py"]
