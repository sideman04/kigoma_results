declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare interface ImportMeta {
  env: Readonly<Record<string, string | undefined>>;
}
