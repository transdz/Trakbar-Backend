// Les Bibliotheque utilise
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';


import errorHandler = require('errorhandler');
// Les routes
import { IndexRoutes } from './routes/index'


/**
 *  server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;



  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {

    //creer une nouvelle instance de l'application express
    this.app = express();


    //configurer application
    this.config();
    console.log(__dirname);


   /** https.createServer({
      key: fs.readFileSync(__dirname +'/key.pem'),
      cert: fs.readFileSync(__dirname +'/cert.pem')
    }, this.app).listen(55555);*/
  }

  /**
   * Configurer application
   *
   * @class Server
   * @method config
   */
  public config() {
      var allowCrossDomain = function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
            next();
      }

          this.app.use(allowCrossDomain); // plumbing it in as middleware

    this.app.use(express.static(path.join(__dirname, 'assets')));


    // monter le  logger
    this.app.use(logger("dev"));

    // Utiliser bodyparser dans l'app  pour Json
    this.app.use(bodyParser.json());
    // Implementer les  Routes
    this.app.use(IndexRoutes)
 // Utiliser bodyparser dans l'app  pour les URL
     this.app.use(bodyParser.urlencoded({
      extended: true
    }));


    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());

  }
}
