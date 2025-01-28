import { Comment } from "./types";

export function getNDaysFromToday(n: number) {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - n);
  return { today, lastWeek }
}

export function filterLastWeekComments(comments: Comment[]) {
  const { lastWeek } = getNDaysFromToday(7)
  const recentComments = comments.filter((comment) => {
    const commentDate = new Date(comment.createdAt);
    return commentDate > lastWeek;
  });
  return recentComments;
}

export function combineComments(title: string, comments: Comment[]) {
  let combined = `# ${title}\n`;
  for (const comment of comments) {
    combined += `## ${new Date(comment.createdAt)}\n`;
    combined += `### Update: ${comment.content}\n\n`;
  }
  return combined;
}
