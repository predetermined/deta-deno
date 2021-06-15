import { ProjectDetails } from "../mod.ts";

export class Template {
  private readonly project: ProjectDetails;
  private readonly apiUrl: string;

  constructor(project: ProjectDetails, serviceSpecificName: string) {
    this.project = project;
    this.apiUrl = `https://database.deta.sh/v1/${project.id}/${serviceSpecificName}/`;
  }

  protected async request(
    method: string,
    { body, suffix }: { body?: any; suffix?: any }
  ) {
    console.log(this.apiUrl + suffix, this.project.key);
    return await fetch(this.apiUrl + suffix, {
      method: method,
      body: JSON.stringify(body),
      headers: new Headers({
        "X-API-Key": this.project.key,
        "Content-Type": "application/json",
      }),
    });
  }
}
