// tomlify-j0.4 ships no types. Only toToml is used, so that is all this
// declares — a narrow declaration beats `any` for the whole module.
declare module 'tomlify-j0.4' {
  export function toToml(
    value: unknown,
    options?: {
      space?: number;
      replace?: (key: string, value: unknown) => string | false;
    },
  ): string;
}
