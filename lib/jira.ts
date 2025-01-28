import { apiClient } from "./apiClient";
import { Comment, Issue } from "./types";

export async function getIssuesWorkedOn(
  userEmail: string,
  dayUntilUpdate: number
) {
  const formattedEmail = userEmail.replace(/@/g, "\\u0040");
  const jql = encodeURI(
    `issueKey in updatedBy(${formattedEmail}, -${dayUntilUpdate}d )`
  );
  const data = await apiClient.get(`/api/3/search?jql=${jql}`);
  let { issues }: { issues: Issue[] } = data.data;
  issues = issues.map((issue: any) => ({
    issueId: issue.id,
    issueTitle: issue.fields.summary,
  }));
  return issues;
}

export async function getIssueComments(issueId: string): Promise<Comment[]> {
  // TODO: calculate last 7 days dates
  const data = await apiClient.get(
    `/api/2/issue/${issueId}/comment?jql=commentedOnDate >= "2025/01/19" AND commentedOnDate < "2025/01/25" `
  );
  let { comments } = data.data;
  comments = comments
    .filter((c: any) => c.author.emailAddress == "akash.np@beinex.com")
    .map((c: any) => ({ content: c.body, createdAt: c.created }));
  return comments;
}
