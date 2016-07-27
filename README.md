# demo-pipeline
demo for the heroku pipeline

### Concurrency

In our [Procfile](Procfile) we set our web and worker. We are using [throng](https://github.com/hunterloftis/throng) for concurrency.

You can set the number of web and worker dynos through the environment variables ```WEB_CONCURRENCY``` and ```WORKER_CONCURRENCY``` (else they default to 1).

### Jobs

Jobs are processed using [kue](https://github.com/Automattic/kue). A redis database is required and must be set through the ```REDIS_URL``` environment variable.

You can pass and process jobs to the global ```jobs``` variable. Typically, web dynos will pass the jobs and worker dynos will process them.

**CONNECTIONS:** kue communicates with redis using multiple connections. The number of connections will grow both with every dyno you launch and this the amount of kue functions you call.

Kue Function  | Conn  | Add. Conn | Type
------------  | ----  | --------- | ----
createQueue() | 2     | N/A       | Permanent
process()     | 2     | 1         | Permanent
create()      | 1     | N/A       | Temporary

We have broken our jobs out into different types, each type will cost a connection to redis:

Type    | Concurrency | Notes
----    | ----------- | -----
small   | 50          | emails
medium  | 25          | dns config
large   | 5           | pdf generation

Therefore:

Dyno    | Min | Max
----    | --- | ---
Web     | 2   | 2 + # create()
Worker  | 6   | N/A

Example: Running 6 web dynos and 2 worker dynos will minimum cost (6*2) + (2*6) = 24 connections

Web | Worker  | Min Conn
--- | ------  | --------
1   | 1       | 8
2   | 1       | 10
1   | 2       | 14
2   | 2       | 16
