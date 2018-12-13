export const filename = __filename

# Deploying with ZEIT Now

[ZEIT Now](https://zeit.co/now) is a [cloud platform for serverless deployment](https://zeit.co/docs/v2/getting-started/introduction-to-now/) that allows you to deploy your Navi projects and then [push live to production](https://zeit.co/docs/v2/domains-and-aliases/aliasing-a-deployment/) on your personal domain or a free `.now.sh` suffixed URL.

This guide will show you how you can deploy a Navi project in just a few steps:

## Step 1: Getting Started with Navi

If you haven't already set up your Navi-based project, head to the [Getting Started page](/) to learn how you can quickly create your own, ready to deploy.

## Step 2: Getting Now

You can get Now by downloading [Now Desktop](https://zeit.co/docs/v2/getting-started/installation/#now-desktop), which will also install [Now CLI](https://zeit.co/docs/v2/getting-started/installation/#now-cli) and keep it up-to-date automatically.

Opening Now Desktop will present you with a signup flow and a quick tutorial to get you acquainted.

Otherwise, to get set up quickly in your terminal, install Now CLI with npm using the following:

```shell
npm install -g now
```

If you don't have an account, signup and then run the `now login` command to log in with your account in the terminal.

## Step 3: Preparing to Deploy

With a project ready to go, you can prepare to deploy by creating a few pieces of configuration which will allow Now to understand how to build our project, what to deploy, and where to route users when serving your app.

The first piece of configuration is a `now.json` file, containing the following:

```json
{
  "version": 2,
  "name": "my-navi-project",
  "builds": [
    {"src": "package.json", "use": "@now/static-build", "config": { "distDir": "build" }}
  ],
  "routes": [
    {"src": "^/static/(.*)", "dest": "/static/$1"},
    {"src": "^/favicon.ico", "dest": "/favicon.ico"},
    {"src": "^/manifest.json", "dest": "/manifest.json"},
    {"src": "^/(.*)", "dest": "/index.html"}
  ]
}
```

To explain the above briefly, this `now.json` file tells Now to:
- Build using [the latest Now 2.0 platform](https://zeit.co/docs/v2/platform/overview/#versioning).
- Set [a project name](https://zeit.co/docs/v2/deployments/configuration/#name) for all deployments.
- Build our application using [the @now/static-build builder](https://zeit.co/docs/v2/deployments/official-builders/static-build-now-static-build/) and configure the builder to look in the `build` directory for the built app.
- Sets paths for Now to [route users](https://zeit.co/docs/v2/deployments/configuration/#routes) to depending on a specific path, otherwise fall back to the `index.html` file (the app).

With this in place, the final piece of configuration is to tell the @now/static-build builder how to build the app for Now to serve from the `build` directory.

By default, create-react-app will provide build scripts, and those scripts will output the `build` directory. The only change you need to make is to create a `now-build` script in the `package.json`:

```json
{
  "scripts": {
    ...
    "now-build": "npm run build"
  }
}
```

## Step 4: Deploying

With configuration complete, the only remaining step is to deploy using the following command in your terminal:

```shell
now
```

Now will then describe the build progress and provide you with a URL similar to this one: https://my-navi-project-7hq734oib.now.sh/

## Resources
- [Visit the ZEIT Now documentation](https://zeit.co/docs) to learn more about what you can deploy and how you can configure your deployments to do more.

