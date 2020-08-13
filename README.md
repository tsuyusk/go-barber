# Go barber

## What is GoBarber ? 
  GoBarber is the main project developed during GoStack Bootcamp. Its purpose is to create an aplication which allows users to book appointments in a barber shop.
  
## How to run it in my machine ?

### Before starting, You need to have:
  - [Git](https://git-scm.com/downloads)
  - [Node JS LTS](https://nodejs.org/en/download/)
  - [Docker Desktop](https://www.docker.com/get-started)

### Before following the next steps, clone this repository:

```bash
 # Cloning
 git clone https://github.com/tsuyusk/go-barber
 
 # Go to the 'go-barber' folder
 cd go-barber
```

### Running the server
```bash
  # Go to the 'backend' folder
  cd backend
  
  # Install dependencies
  npm install
  
  # Create a PostgreSQL instance with docker
  docker run --name go_barber_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
  
  # Create a database inside this instance called 'gostack_gobarber'
  
  # Start the server
  npm run dev:server / npm run start:ts
```

### Running the web version ( provider version )

```bash
  # Go to the 'web' folder
  cd web
  
  # Install dependencies
  npm install
  
  # Start the web version
  npm start
  
  # Go to http://localhost:3000
```
  
### Running the mobile version ( user version )

```bash
  # Go to the 'appgobarber' folder
  cd appgobarber
  
  # Install dependencies
  npm install
  
  # If You are on IOS,
  cd ios
  pod install
  
  # Install the mobile version
  npm run android / npm run ios
```

**If the mobile version does not work, You might have to replace the ipv4 in appgobarber/src/services/api.ts for your ipv4**

Made with 💜 by tsuyusk
