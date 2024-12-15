export function setupVariants<T extends string>(params: {
  defaultClasses: string;
  variants: Record<T, string>;
}) {
  return function (variant: T) {
    if (variant in params.variants) {
      return `${params.defaultClasses} ${params.variants[variant]}`;
    } else {
      return params.defaultClasses;
    }
  };
}

export type InferVariants<T> = T extends (variant: infer V) => any ? V : never;
