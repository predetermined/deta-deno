import Base from "./services/base.ts";

export interface ProjectDetails {
  id: string;
  key: string;
}

interface ProjectDetailsWithMoreContext {
  projectId: string;
  projectKey: string;
}

export default class Deta {
  private readonly project: ProjectDetails;
  public readonly Base: { new (databaseName: string): Base };

  constructor({
    projectId: id,
    projectKey: key,
  }: ProjectDetailsWithMoreContext) {
    this.project = { id, key };
    this.Base = Base.bind(this, this.project);
  }
}
