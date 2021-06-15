import Base from "./services/base.ts";

export interface ProjectDetails {
  id: string;
  key: string;
}

export default class Deta {
  private readonly project: ProjectDetails;
  public readonly Base: { new (databaseName: string): Base };

  constructor(project: ProjectDetails) {
    this.project = project;
    this.Base = Base.bind(this, project);
  }
}
