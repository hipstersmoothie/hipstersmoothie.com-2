declare module "copy-template-dir" {
  export default function copy(
    src: string,
    dest: string,
    vars: Record<string, unknown>,
    cb: (err: Error | null, createdFiles: string[]) => void
  ): void;
}
