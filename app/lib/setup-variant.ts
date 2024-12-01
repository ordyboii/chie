export function setupVariant<TVariant extends string>(params: {
  defaultClasses: string;
  variants: Record<TVariant, string>;
}) {
  return function (variant: TVariant) {
    if (variant in params.variants) {
      return `${params.defaultClasses} ${params.variants[variant]}`;
    } else {
      return params.defaultClasses;
    }
  };
}

export type InferVariants<T> = T extends (variant: infer V) => any ? V : never;
