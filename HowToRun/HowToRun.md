How To Run:

I didn't want to complicate things, so i avoided using docker to containerize the project.
This said, to run the app you'll just need to call:

```bash
npm run start
```

in each of the folders "recipes" and "server"
the frontent will run on the default React port, on <http://localhost:3000>
the backend on it's port, on <http://localhost:8080>

Alternatively, you can use the Makefile tools I have left in both folders, just cd in and type

```bash
make install && make
```

to run the app, or

```bash
make clean
```

to clean up node_modules
