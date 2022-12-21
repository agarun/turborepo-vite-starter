import { apps } from '@myorg/shared';

export const matchAppFromPath = path => {
  const currentApp = path.split('/')[1];
  return apps.find(app => app.href.match(new RegExp(`^/${currentApp}`)));
};

export const appUrlFromPath = path => {
  const app = matchAppFromPath(path);
  return app ? app.href : '/';
};

export const userHasPermissionForApp = app => {
  throw Error();
};

export const userHasPermissionForPath = path => {
  const app = matchAppFromPath(path);
  if (!app) {
    return true;
  }
  return userHasPermissionForApp(app);
};
