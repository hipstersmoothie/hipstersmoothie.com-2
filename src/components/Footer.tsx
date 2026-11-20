import resume from "../app/resume.json";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-ink hover:underline underline-offset-4 decoration-ink-3"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hair py-10 pb-14 text-[13px] text-ink-2">
      <div className="max-w-[1180px] mx-auto px-6 flex flex-wrap justify-between gap-3 gap-x-6">
        <ul className="flex flex-wrap gap-5">
          {resume.basics.profiles.map((profile) => (
            <li key={profile.network}>
              <FooterLink href={profile.url}>{profile.label}</FooterLink>
            </li>
          ))}
          <li>
            <FooterLink href="/rss.xml">RSS</FooterLink>
          </li>
          <li>
            <FooterLink href={`mailto:${resume.basics.email}`}>Email</FooterLink>
          </li>
        </ul>
        <span>© {new Date().getFullYear()} Andrew Lisowski</span>
      </div>
    </footer>
  );
}
