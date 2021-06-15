import Base from "../services/base.ts";

const projectId = Deno.env.get("PROJECT_ID");
const projectKey = Deno.env.get("PROJECT_KEY");
const databaseName = Deno.env.get("BASE_DATABASE_NAME");

if (!projectId || !projectKey || !databaseName)
  throw new Error("Not all env variables set");

const base = new Base({ id: projectId, key: projectKey }, databaseName);

Deno.test("base/clean", async () => {
  for (const item of (await base.query([])).items) {
    await base.delete(item.key);
  }
});

Deno.test("base/create", async () => {
  if (!(await base.insert({ hello: "world" })).processed) {
    throw new Error("Not processed");
  }
});

Deno.test("base/query", async () => {
  if ((await base.query([])).items.length !== 1) {
    throw new Error("Wrong query item length");
  }
});

Deno.test("base/get", async () => {
  const testItem = (await base.query([])).items[0];
  if ((await base.get(testItem.key)).hello !== "world") {
    throw new Error("Wrong item hello value");
  }
});

Deno.test("base/update", async () => {
  const testItem = (await base.query([])).items[0];

  if ((await base.get(testItem.key)).hello !== "world") {
    throw new Error("Wrong item hello value");
  }

  await base.update(testItem.key, { set: { hello: "world2" } });
  if ((await base.get(testItem.key)).hello !== "world2") {
    throw new Error("Wrong item hello value after update");
  }
});

Deno.test("base/delete", async () => {
  const testItem = (await base.query([])).items[0];
  if (!(await base.delete(testItem.key)).key) {
    throw new Error("Wrong item hello value");
  }
});
