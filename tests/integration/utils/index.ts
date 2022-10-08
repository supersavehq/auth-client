import { SuperSave, EntityDefinition } from 'supersave';
import { superSaveAuth } from 'supersave-auth';
import express from 'express';
import http from 'node:http';
export { requester } from './requester';

// type Planet = {
//   id: string;
//   name: string;
//   distance?: number;
//   userId: string;
// };
// type PlanetWithoutId = Omit<Planet, 'id'>;

export const planetCollection: EntityDefinition = {
  name: 'planet',
  template: {
    name: '',
  },
  relations: [],
};

export async function getServer() {
  const superSave = await SuperSave.create('sqlite://:memory:');

  const app = express();
  app.use(express.json());
  const { router, addCollection } = await superSaveAuth(superSave, {
    tokenSecret: 'unit-test-secret',
    accessTokenExpiration: 300,
  });

  app.use('/auth', router);

  await addCollection(planetCollection);

  const server = http.createServer(app);
  const port = await new Promise((resolve) => {
    // @ts-expect-error The typings are not correct.
    server.listen(() => resolve(server.address().port));
  });

  return {
    prefix: `http://localhost:${port}/auth`,
    close: async () =>
      new Promise<void>((resolve) => {
        server.close(() => resolve());
      }),
  };
}
