export default function CourseHeadings() {
  return (
    <aside className="py-10 px-4  border-l overflow-y-auto hidden md:block max-h-[500px] sticky top-0 mt-8">
      <h3 className="text-lg font-semibold text-zinc-700">Content</h3>
      <ul className="mt-2 flex flex-col gap-1">
        <li>
          <a
            href="#"
            className="py-[2px] font-light text-muted-foreground px-2 rounded hover:bg-accent hover:text-accent-foreground"
          >
            Part 1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="py-[2px] px-2 font-light text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground"
          >
            Part 2
          </a>
        </li>
        <li>
          <a
            href="#"
            className="py-[2px] px-2 text-muted-foreground font-light rounded hover:bg-accent hover:text-accent-foreground"
          >
            Part 3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="py-[2px] px-2 font-light text-muted-foreground rounded hover:bg-accent hover:text-accent-foreground"
          >
            Part 4
          </a>
        </li>
      </ul>
    </aside>
  );
}
