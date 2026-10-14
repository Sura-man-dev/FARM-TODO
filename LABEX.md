# Run FARM-ToDo in LabEx Docker Playground

This project uses Docker Compose to run MongoDB, the Python API, the React development server, and Nginx. Open the application through port **8000**; Nginx routes page requests to React and `/api` requests to the backend.

## 1. Put the project in the LabEx terminal

Open the [LabEx Docker Playground](https://labex.io/playgrounds/docker), choose **Open Docker Lab**, sign in, and complete the lab setup. The public page is an introduction; the signed-in lab terminal is where Docker commands run.

From that terminal, get the project files into the lab workspace. If the repository is on GitHub, clone it and enter its directory:

```sh
git clone <your-repository-url> FARM-ToDo
cd FARM-ToDo
```

If it is not in a Git repository, upload/copy the project files using the file transfer option provided by your LabEx lab, then `cd` into the directory containing `compose.yaml`. Include `backend/`, `frontend/`, `nginx/`, and `compose.yaml`.

## 2. Start the application

Check that the lab provides Docker Compose, then build and start the stack:

```sh
docker compose version
docker compose up --build -d
```

The first start downloads images and installs the frontend dependencies, so it may take a few minutes. Check startup with:

```sh
docker compose ps
docker compose logs -f
```

Wait until MongoDB is healthy and the frontend reports that it compiled successfully. Press **Ctrl+C** to stop following logs; this leaves the stack running.

## 3. Open the app

Use LabEx's exposed-port or web-preview control for port **8000** and open the generated link. If the lab provides a direct URL pattern instead, use that lab's instructions for port 8000. The app is served through Nginx, so use this port rather than 3000, 3001, or 27017.

## 4. Stop the stack

```sh
docker compose down
```

Your MongoDB data is stored in the Compose volume `mongo_data` and is kept when you run the command above. To also delete that database data:

```sh
docker compose down -v
```

LabEx sessions are hosted environments; copy or push any work you need to keep outside the lab before the session ends.
