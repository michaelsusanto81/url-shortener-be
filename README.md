# URL Shortener Backend
This repository contains an API to shorten a long URL.

## Author
Created by Michael Susanto with modification from [bradtaversy/url_shortener_service](https://github.com/bradtraversy/url_shortener_service)

## Techstacks
- EJS (View Template Engine)
- TailwindCSS (UI Utility-First Styling Approach)
- ExpressJS (Server)
- Docker Compose
- MongoDB (Database)

## Endpoint usage
- **[POST]** /api/url/shorten
```
Request body:
{
  longUrl: String,
  urlCode: String
}
```

## User Interface
- Access http://localhost on Browser to see in action (with User Interface)

## How to use
- Build TailwindCSS
```
npm run build-css:dev
npm run build-css
```

- Run
```
docker-compose up -d --build
```

- Stop
```
docker-compose down
```
