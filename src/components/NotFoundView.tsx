import Link from "next/link";

type NotFoundViewProps = {
  title: string;
  message: string;
  backLabel: string;
};

export function NotFoundView({ title, message, backLabel }: NotFoundViewProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-fg">
      <h1 className="font-sans text-4xl font-bold">{title}</h1>
      <p>{message}</p>
      <Link href="/" className="underline">
        {backLabel}
      </Link>
    </main>
  );
}
