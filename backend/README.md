# pass Culture Institutional backend

## Install and configure Postgres

#### Installing Postgres as a standardized Mac app (recommended)

Install Postgres from this link:
https://postgresapp.com/
Download, copy to your applications folder, and start the app.
Click on Initialize.
3 default databases will be created.

In a terminal, configure your $PATH to use the included command line tools:

```zsh
sudo mkdir -p /etc/paths.d &&echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

Exit all terminals. Open a new terminal and now you should be able to run:

```zsh
psql --version
psql (PostgreSQL) 16.0
```

You must connect as the superuser to create a database:

```bash
psql -U postgres
```

To see existing databases:

```bash
\list
```

To create a new one:

```bash
CREATE DATABASE db_institutional;
```

## Configure environment variables

Go back to the project, and create a `.env` for the backend. Get the full version from pass Culture [1Password](https://team-passculture.1password.com/) (search "Site institutionnel" in "Tech" section).

Be sure to replace `DATABASE_NAME` and `DATABASE_PASSWORD` with a Postgres user with sufficient permissions to access the database `db_institutional` you created earlier:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS=xxx
API_TOKEN_SALT=xxx
ADMIN_JWT_SECRET=xxx
TRANSFER_TOKEN_SALT=xxx

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=db_institutional
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_SSL=false
JWT_SECRET=xxx
```

## Starting Strapi

If you have Postgres configured and running, from the project repo, start Strapi with the command:

```
cd backend && yarn develop
```

You should be redirected to the Strapi web interface at `localhost:1337`.
Create an account or connect to an existing one.

## Testing Strapi

Once connected, if you go to `Content-Type Builder`, you will find collection types like `Category` or `Restaurant`.
Go to the `Content Manager` and add a `Restaurant` by clicking on `Create an entry`.
Make sure to `Save` and `Publish`.

If you try to go to `http://localhost:1337/api/restaurants` in your browser, you should see:

```
{"data":null,"error":{"status":403,"name":"ForbiddenError","message":"Forbidden","details":{}}}
```

To make the route public, go to `Settings`, and then under `Users & Permissions Plugin`you will find `Roles`.
Then in the list of roles, you will see `Public`. Edit the role.
Under `permissions` you should see `Restaurant`. Unfold and check the box `find`.
Now if you go make to `http://localhost:1337/api/restaurants`, you should see:

```
{"data":[{"id":1,"attributes":{"name":"Resto trop bon","description":"Y'a de la viande à gogo","createdAt":"2023-10-23T12:00:49.307Z","updatedAt":"2023-10-23T12:00:50.525Z","publishedAt":"2023-10-23T12:00:50.522Z"}}],"meta":{"pagination":{"page":1,"pageSize":25,"pageCount":1,"total":1}}}
```

## Project Scripts

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.
Before you can use the scripts, ensure you have `Yarn` installed on your system.

- `yarn develop`: Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)
- `yarn start`: Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)
- `yarn build`: Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)
- `yarn strapi`: Discover other features provided by Strapi.
- `yarn test:deadcode:` Find unused code using ts-prune.

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.
