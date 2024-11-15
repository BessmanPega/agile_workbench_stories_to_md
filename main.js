import * as xlsx from 'xlsx/xlsx.mjs';
import * as fs from 'fs';
import MarkdownIt from 'markdown-it';

const input_html_header_path = "header.html";
const input_html_footer_path = "footer.html";
const output_markdown_path = "stories.md";
const output_html_path = "stories.html";

if (process.argv.length != 3)
{
  console.log("Incorrect usage, should be: node main.js /path/to/filename.csv");
  process.exit(1);
}

const input_xlsx_path = process.argv[2];
process.stdout.write(`Reading ${input_xlsx_path}... `);

xlsx.set_fs(fs);
const workbook = xlsx.readFile(input_xlsx_path);
const input_json = xlsx.utils.sheet_to_json(workbook.Sheets['Stories']);
console.log("done.");

// Data looks like this:
// {
//   ID: 'US-1001',
//   Name: 'New Story',
//   Description: '',
//   'Associated feature ID': '',
//   'Associated feature': '',
//   Owner: '',
//   'Due date': '',
//   Complexity: '',
//   Priority: 'Future',
//   'Acceptance criteria': ''
// }

function make_list_item_if_exists(item, key)
{
  if (item[key].length > 0)
  {
    return `- ${key}: ${item[key]}\n`;
  }

  return "";
}

process.stdout.write("Converting xlsx to markdown... ");
let output_markdown = "# Stories\n";
for (const item of input_json)
{
  output_markdown += "\n***\n\n";
  output_markdown += `## ${item["ID"]}: ${item["Name"]}\n\n`;
  output_markdown += `${item["Description"]}\n\n`;
  output_markdown += make_list_item_if_exists(item, "Acceptance criteria");
  output_markdown += make_list_item_if_exists(item, "Associated feature");
  output_markdown += make_list_item_if_exists(item, "Complexity");
  output_markdown += make_list_item_if_exists(item, "Due date");
  output_markdown += make_list_item_if_exists(item, "Owner");
  output_markdown += make_list_item_if_exists(item, "Priority");
}
console.log("done.");

process.stdout.write(`Writing ${output_markdown_path}... `);
fs.writeFileSync(output_markdown_path, output_markdown);
console.log("done.");

process.stdout.write("Converting markdown to html... ");
const md = new MarkdownIt({ linkify: true });
const html_header = fs.readFileSync(input_html_header_path);
const html_body = md.render(output_markdown);
const html_footer = fs.readFileSync(input_html_footer_path);
const html_output = html_header + html_body + html_footer;
console.log("done.");

process.stdout.write(`Writing ${output_html_path}... `);
fs.writeFileSync(output_html_path, html_output);
console.log("done.");
