import Base from "../services/base.ts";

const projectId = Deno.env.get("PROJECT_ID");
const projectKey = Deno.env.get("PROJECT_KEY");
const databaseName = Deno.env.get("BASE_DATABASE_NAME");

if (!projectId || !projectKey || !databaseName)
  throw new Error("Not all env variables set");

const base = new Base({ id: projectId, key: projectKey }, databaseName);

Deno.test("base/create", async () => {
  if (!(await base.insert({ hello: "world" })).processed) {
    throw new Error("Not processed");
  }
});
