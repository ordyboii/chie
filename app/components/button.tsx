import "./button.css";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, PropsWithChildren } from "react";

// function setupComponentVariants<T extends Record<string, string>>(params: {
//   defaultClass: string;
//   variants: T;
// }) {
//   const { defaultClass, variants } = params;
//   return function (props: { variant: keyof T; className?: string }) {
//     return `${defaultClass} ${variants[props.variant]} ${props.className}`;
//   };
// }

// type InferVariants<T> = T extends (props: { variant: infer V }) => any
//   ? V
//   : never;

// const variants = setupComponentVariants({
//   defaultClass: "m-button",
//   variants: {
//     secondary: "m-button--secondary",
//     danger: "m-button--danger",
//     ghost: "m-button--ghost",
//   },
// });

export default function Button(
  props: PropsWithChildren<
    HTMLAttributes<HTMLButtonElement> & {
      variant: InferVariants<typeof variants>;
    }
  >
) {
  return (
    <button className={props.variant} {...props}>
      {props.children}
    </button>
  );
}

export function InternalLinkButton(
  props: PropsWithChildren<
    LinkProps & { variant: InferVariants<typeof variants> }
  >
) {
  return (
    <Link className={props.variant} {...props}>
      {props.children}
    </Link>
  );
}

export function ExternalLinkButton(
  props: PropsWithChildren<
    HTMLAttributes<HTMLAnchorElement> & {
      variant: InferVariants<typeof variants>;
    }
  >
) {
  return (
    <a className={props.variant} {...props}>
      {props.children}
    </a>
  );
}
