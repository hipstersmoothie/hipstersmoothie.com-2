import resume from "../app/resume.json";
import { BasicLink } from "./ui/typography";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 items-center justify-center w-full  py-8 bg-mauve-3 dark:bg-mauvedark-2">
      <ul className="flex">
        {resume.basics.profiles.map((profile) => (
          <li
            key={profile.network}
            className="
              flex items-center
              after:content after:block after:h-1 after:w-1 after:mx-4
              last:after:hidden
            after:bg-mauve-8 dark:after:bg-mauvedark-8
            "
          >
            <BasicLink
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
              text-mauve-11 dark:text-mauvedark-11 visited:text-mauve-11 visited:dark:text-mauvedark-11"
            >
              {profile.label}
            </BasicLink>
          </li>
        ))}
      </ul>
      <span className="text-mauve-11 dark:text-mauvedark-11">
        © {new Date().getFullYear()} Andrew Lisowski
      </span>
    </footer>
  );
}
