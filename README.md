![Sample output.](docs/sample.png)

This is a NodeJS project that converts stories exported from Pega's Agile Workbench into Markdown and HTML.

To install, make sure you have a recent version of [Node.js](https://nodejs.org) installed and run `npm install`.

Example usage:

```
PS C:\agile_workbench_stories_to_md> node main.js C:\Stories.xlsx
Reading C:\Users\bessp\Downloads\Stories_UplusSample20241115T153118.354 GMT.xlsx... done.
Converting xlsx to markdown... done.
Writing stories.md... done.
Converting markdown to html... done.
Writing stories.html... done.
```

You can easily fine tune `stories.md` before running it through your preferred html conversion method with whatever styling you prefer.

As a convenience, the program also generates `stories.html`, styled with [water.css](https://github.com/kognise/water.css).

To export stories, first access the Application Profile from App Studio:

![Application profile.](docs/application_profile.png)

Then select "Export Stories" from the Actions menu:

![Export stories.](docs/export_stories.png)