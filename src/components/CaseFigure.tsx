import Image from "next/image";

type CaseFigureProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export function CaseFigure({ src, width, height, alt, caption }: CaseFigureProps) {
  return (
    <figure className="m-0 flex flex-col gap-3">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 960px, 100vw"
        className="h-auto w-full rounded-xl border border-line"
      />
      <figcaption className="text-sm leading-relaxed text-fg-muted">{caption}</figcaption>
    </figure>
  );
}
