# Experts server

> Server for Building products with javascript course use case

[![Build Status](https://gitlab.com/yamalight/building-products-with-js/badges/master/build.svg)](https://gitlab.com/yamalight/building-products-with-js/pipelines)

This is a simple REST API server that provides CRUD capabilities for the experts polling use-case.
The server is build using [Express.js](https://expressjs.com/) as a server and [Passport.js](http://passportjs.org/) as authentication middleware with code compiled from ES2015+ by [babel](http://babeljs.io/)
It relies on [RethinkDB](https://www.rethinkdb.com/) as a database for storing data.

## Usage

Experts server can be launched in two ways - using docker, or using node.

### Using Docker

An assembled docker image is automatically published on Docker Hub after every push.
First, make sure rethinkdb is running in your docker, e.g. by running:

    $ docker run -d --name expertsdb rethinkdb

After that, all you have to do to run experts server locally is execute the following docker command:

    $ docker run -d --link expertsdb -e EXPERTS_DB_URL=expertsdb -p 8080:8080 yamalight/bpwjs-server

This will start experts server in daemon mode, link it with your instance of rethinkdb and forward port 8080 to your docker host so you can access it.  
You can also replace `-d` flag with `-it` flags to get interactive session and see the output of server in your console.

### Using Node

Running using Node requires you having Node.js v4 or later (v6 is recommended) installed.
To run the server locally, do the following:  
1. Clone this repository
2. Enter `./server` folder
3. Install dependencies with `npm install`
4. Make sure you have local RethinkDB running (or start one using `npm run db:create`, requires docker)
5. Start the server using `npm start`
6. Navigate to [http://localhost:8080](http://localhost:8080) in your browser

## Development

Development requires you having Node.js v4 or later installed.  
To run server for development just follow instuctions from [Using Node](#using-node) section.  
To run test suite simply execute `npm test`.
To see all available commands, see package.json.

## Contributing

For bug fixes, documentation changes, and small features:  
1. Fork this repository  
2. Create your feature branch (`git checkout -b my-new-feature`)  
3. Commit your changes (`git commit -am 'Add some feature'`)  
4. Push to the branch (`git push origin my-new-feature`)  
5. Create a new Pull Request  

For larger new features: Do everything as above, but first also make contact with the project maintainers to be sure your change fits with the project direction and you won't be wasting effort going in the wrong direction.

## Contributors

Thanks to all the people who helped to make this project better:

1. [frankhinek](https://github.com/frankhinek)
2. [EliasJorgensen](https://github.com/EliasJorgensen)

## License

[MIT](https://opensource.org/licenses/mit-license)
