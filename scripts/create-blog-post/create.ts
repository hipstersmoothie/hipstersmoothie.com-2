import copy from "copy-template-dir";
import path from "path";
import { app, Command } from "command-line-application";
import { dotCase } from "change-case";

const createBlogPost: Command = {
  name: "create-blog-post",
  description: "Create a new blog post",
  examples: [
    'create-blog-post "Hello World"',
    'create-blog-post --title "Hello World"',
  ],
  require: ["title"],
  options: [
    {
      name: "title",
      type: String,
      defaultOption: true,
      description: "The title of the blog post",
    },
  ],
};

const args = app(createBlogPost);

if (!args) {
  process.exit(1);
}

const slug = dotCase(args.title).replace(/\./g, "-");
const vars = { slug, date: new Date().toISOString() };
const inDir = path.join(__dirname, "template");
const outDir = path.join(__dirname, "../../src/app/blog/posts");

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) {
    throw err;
  }

  createdFiles.forEach((filePath) => console.log(`Created ${filePath}`));
  console.log("done!");
});
