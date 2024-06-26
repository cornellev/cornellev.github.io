# Auto-generated by my custom tooling script
# Created: Sat Apr 27 01:02:49 EDT 2024

# Sources
# - https://www.askpython.com/python-modules/python-httpserver
# - https://stackoverflow.com/questions/47614409/wait-for-terminal-command-to-finish-in-python
# - https://stackoverflow.com/questions/22467908/python-simplehttpserver-404-page
# - https://stackoverflow.com/questions/3204782/how-to-check-if-a-file-is-a-directory-or-regular-file-in-python

from http.server import SimpleHTTPRequestHandler
import socketserver
import subprocess
from os.path import isdir, isfile

PORT = 8005

def build_website(request):
    # necessary setup routines such as SSG
    cmd = subprocess.Popen(['make', 'clean_mac'])
    cmd.communicate()
    cmd = subprocess.Popen(['make', 'src'])
    cmd.communicate()

class MyHttpRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        build_website(self)
        path = self.path.rstrip('/')
        if isdir('.' + path):
            if isfile('.' + path + '/index.html'):
                path += '/index.html'
            else:
                path += ".html"
        self.path = path

        print('Requesting ' + self.path)
        return SimpleHTTPRequestHandler.do_GET(self)
    def send_error(self, code, message=None):
        if code == 404:
            with open("404.html", "r") as file404:
                self.error_message_format = file404.read();
        SimpleHTTPRequestHandler.send_error(self, code, message)

Handler = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
