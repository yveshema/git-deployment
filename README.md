# git-deployment
A simple app deployed through version control

The app itself is a simple node application consisting of one page and a React contact form component. The React library itself is loaded from a CDN directly onto the page. The React component is first compiled using Babel and the resulting code served with the page.

The server itself is built with Express and all it does respond to get request for the main page and process email messages from the contact form using nodemailer.

The app is containerized using docker compose. Two configuration files are used, one for development and one in production.

To deploy the application, the following steps are followed:

1. Create a bare repository on production server. This assumes write access to the server and git installed.
```

mkdir -p node-project && cd node-project
git init --bare

```
2. Add the repository just created as a remote from the local machine
```

git remote add prod ssh://remote_server/path_to_remote_repo

```
3. Create a directory from which the app will be served on the remote server and using it to checkout files from the remote repo using the post-receive git hook.
```

mkdir -p my_app

```
and change the contents of the post-receive script to the following:
```

#!/bin/sh
GIT_WORK_TREE=/path/to/my_app git checkout -f

```

Now the app is ready for deployment. First we have to push:
```

git push prod master

```

The app is deployed. From inside my_app directory, run the following to deploy:
```

docker-compose up -d

```