import { Template } from "./template.ts";
import { ProjectDetails } from "../mod.ts";

type SingleInsertData = Record<string, unknown>;
type InsertData = SingleInsertData[];

interface QueryResultItem {
  key: string;
  [details: string]: unknown;
}

interface QueryResult {
  items: QueryResultItem[];
  paging: { size: number };
}

interface UpdateActions {
  set?: Record<string, unknown>;
  increment?: Record<string, unknown>;
  append?: Record<string, unknown>;
  prepend?: Record<string, unknown>;
  delete?: string[];
}

export default class Base extends Template {
  constructor(project: ProjectDetails, databaseName: string) {
    super(project, databaseName);
  }

  private convertToInsertData(data: SingleInsertData | InsertData): InsertData {
    return Array.isArray(data) ? data : [data];
  }

  public async insert(
    data: SingleInsertData | InsertData
  ): Promise<{ processed: { items: QueryResultItem[] } }> {
    return await (
      await this.request("PUT", {
        suffix: "items",
        body: {
          items: this.convertToInsertData(data),
        },
      })
    ).json();
  }

  async get(key: string): Promise<QueryResultItem> {
    return await (
      await this.request("GET", {
        suffix: "items/" + encodeURIComponent(key),
      })
    ).json();
  }

  async delete<K extends string>(key: K): Promise<{ key: K }> {
    return await (
      await this.request("DELETE", {
        suffix: "items/" + encodeURIComponent(key),
      })
    ).json();
  }

  async query(condition: SingleInsertData | InsertData): Promise<QueryResult> {
    return await (
      await this.request("POST", {
        suffix: "query",
        body: {
          query: this.convertToInsertData(condition),
        },
      })
    ).json();
  }

  async update<K extends string, A extends UpdateActions>(
    key: K,
    actions: A
  ): Promise<{ key: K } & A> {
    return await (
      await this.request("PATCH", {
        suffix: "items/" + encodeURIComponent(key),
        body: actions,
      })
    ).json();
  }
}
