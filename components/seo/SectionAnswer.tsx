type SectionAnswerProps = {
  children: string;
};

/**
 * One direct sentence under a section heading so the section can be quoted.
 */
export function SectionAnswer({ children }: SectionAnswerProps) {
  return <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-700">{children}</p>;
}
