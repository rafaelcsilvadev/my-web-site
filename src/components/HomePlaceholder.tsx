type HomePlaceholderProps = {
  title: string;
};

export function HomePlaceholder({ title }: HomePlaceholderProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-fg">
      <h1 className="font-sans text-4xl font-bold">{title}</h1>
    </main>
  );
}
