import fs from "node:fs";
import XLSX from "xlsx"
import { input, number, select } from '@inquirer/prompts';

import { filterLastWeekComments, combineComments, filterCommentsBwDateRange } from "./lib/utils";
import { getIssuesWorkedOn, getIssueComments } from "./lib/jira"

import "dotenv/config"
import { extractKPIs } from "./lib/ai";

const userEmail = await input({message: "Enter email whose updates are to be fetched."})
const updatesFrom  = await number({message: "Enter the days from which the updates are to be extracted? Eg: 7 for updates from 7 days till today."})
const outputType = await select({message: "Output format?", choices: [{name: "Markdown", value: "md"}, { name: "excel", value: "xlsx"}]})

async function main() {
  let recentIssues = await getIssuesWorkedOn(userEmail, updatesFrom!);
  for (let issue of recentIssues) {
    let comments = await getIssueComments(issue.issueId);
    comments = filterLastWeekComments(comments)
    issue.commentsSummary = combineComments(issue.issueTitle, comments)
  }


  // const response = await extractKPIs("Hello")
  if (outputType == "xlsx") {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(recentIssues);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFileXLSX(workbook, "jira-comments.xlsx");
    console.log("Updates extracted to jira-comments.xlsx")
  } else {
    let allUpdates = ''
    for (const comment of recentIssues) {
      allUpdates += `${comment.commentsSummary}\n\n`
    }
    fs.writeFile('updates.txt', allUpdates, err => {
      if (err) {
        console.error(err)
      } else {
        console.log("File written successfully")
      }
    })
    console.log('Wrote file')
  }
}

main();
