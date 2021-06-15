import Base from "./services/base.ts";

export interface ProjectDetails {
  id: string;
  key: string;
}

export default class Deta {
  private readonly projectId: string;
  private readonly projectKey: string;
  public readonly Base: { new (databaseName: string): Base };

  constructor({
    projectId,
    projectKey,
  }: {
    projectId: string;
    projectKey: string;
  }) {
    this.projectId = projectId;
    this.projectKey = projectKey;
    this.Base = Base.bind(this, { id: this.projectId, key: this.projectKey });
  }
}
