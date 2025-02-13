# coding: utf-8

import glob
import socket
import os.path
import tornado.web
import tornado.httpserver
import tornado.ioloop
from tornado.options import define, options

cd = os.path.dirname(__file__)
define("port", default=8000, help="run on the given port", type=int)
define("debug", default=0, help="1:watch in real time (debug mode)", type=bool)

texts = []
for g in sorted(glob.glob(cd+"/docs/doc*.txt")):
    with open(g, encoding="utf-8") as f:
        doc_id = os.path.basename(g)[3:-4]
        texts.append([doc_id] + [x for x in f.readlines() if x != "\n"])
        #print()
        # => [doc_id, title, body, question, choice1, c.2, c.3, c.4]


class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
                (r"/", IndexHandler),
                (r"/doc/(\w+)/?", DocHandler),
                ]
        settings = dict(
                template_path=os.path.join(os.path.dirname(__file__), "templates"),
                static_path=os.path.join(os.path.dirname(__file__), "assets"),
                debug=options.debug,
                )
        tornado.web.Application.__init__(self, handlers, **settings)


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html', texts=texts)


class DocHandler(tornado.web.RequestHandler):
    def get(self, query=""):
        t = texts[int(query)]  # starting from 0
        self.render('doc.html', title=t[1], body=t[2:-5],
                    question=t[-5], choices=t[-4:])


if __name__ == "__main__":
    tornado.options.parse_command_line()
    port = options.port
    port_env = os.environ.get("PORT")
    if port_env:
        port = port_env

    print(">> Application is running. Please access to http://" +
          socket.gethostbyname('localhost') + ":" + str(options.port))
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
