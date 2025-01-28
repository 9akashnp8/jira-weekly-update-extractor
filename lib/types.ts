export type Issue = {
  issueId: string;
  issueTitle: string;
  commentsSummary?: string
};

export type Comment = {
  content: string;
  createdAt: string;
};
