# URL Shortener Backend
This repository contains an API to shorten a long URL.

## Author
Created by Michael Susanto with modification from [bradtaversy/url_shortener_service](https://github.com/bradtraversy/url_shortener_service)

## Endpoint usage
- **[POST]** /api/url/shorten
```
Request body:
{
  longUrl: String,
  urlCode: String
}
```

## How to use
- Run
```
docker-compose up -d --build
```

- Stop
```
docker-compose down
```

## Additional Notes
There is also an additional endpoint that serves the Frontend's View by accessing the root (/) endpoint.
