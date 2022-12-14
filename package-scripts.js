const path = require("path");

const apiPath = path.resolve(__dirname, "apps/api");
const webPath = path.resolve(__dirname, "apps/web");

const ciApiPath = path.resolve(__dirname, "out/apps/api");
const ciWebPath = path.resolve(__dirname, "out/apps/web");

module.exports = {
  scripts: {
    prepare: {
      default: `nps prepare.web prepare.api`,
      web: `yarn`,
      api: `nps prepare.docker prisma.migrate.dev`,
      docker: "docker compose up -d",
      ci: {
        web: `npx turbo prune --scope=web && cd out && yarn install --frozen-lockfile`,
        api: `npx turbo prune --scope=api && cd out && yarn install --frozen-lockfile && nps prisma.generate`,
      },
    },
    test: {
      default: `nps test.web test.api`,
      web: `cd ${webPath} && yarn test`,
      api: `cd ${apiPath} && yarn test`,
      ci: {
        default: `nps test.ci.web test.ci.api`,
        web: `cd ${ciWebPath} && yarn test:ci`,
        api: `cd ${ciApiPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.web test.watch.api`,
        web: `cd ${webPath} && yarn test:watch`,
        api: `cd ${apiPath} && yarn test:watch`,
      },
    },
    prisma: {
      generate: `cd ${apiPath} && npx prisma generate`,
      studio: `cd ${apiPath} && npx prisma studio`,
      migrate: {
        dev: `cd ${apiPath} && npx prisma migrate dev`,
      },
    },
    build: {
      default: "npx turbo run build",
      ci: {
        web: "cd out && npm run build",
        api: "cd out && npm run build",
      },
    },
    docker: {
      build: {
        default: "nps docker.build.web docker.build.api",
        web: `docker build -t web . -f ${webPath}/Dockerfile`,
        api: `docker build -t api . -f ${apiPath}/Dockerfile`,
      },
    },
    dev: "npx turbo run dev",
  },
};
