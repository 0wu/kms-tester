#!/usr/bin/env python

import BaseHTTPServer, SimpleHTTPServer
import ssl, sys

httpd = BaseHTTPServer.HTTPServer(('0.0.0.0', 8000), SimpleHTTPServer.SimpleHTTPRequestHandler)
if len(sys.argv)>1:
	print "activate ssl"
	httpd.socket = ssl.wrap_socket (httpd.socket, certfile='server.pem', server_side=True)
httpd.serve_forever()
