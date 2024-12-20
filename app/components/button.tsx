import Link, { LinkProps } from "next/link";
import { HTMLAttributes, PropsWithChildren } from "react";

type Variant = "default" | "secondary" | "danger" | "ghost";

export default function Button(
  props: PropsWithChildren<
    HTMLAttributes<HTMLButtonElement> & {
      variant: Variant;
    }
  >
) {
  return (
    <button
      className={`m-button ${props.className}`}
      data-variant={props.variant}
      {...props}
    >
      {props.children}
    </button>
  );
}

export function InternalLinkButton(props: LinkProps & { variant: Variant }) {
  return (
    <Link
      className={`m-button ${props.className}`}
      data-variant={props.variant}
      {...props}
    >
      {props.children}
    </Link>
  );
}

export function ExternalLinkButton(
  props: PropsWithChildren<
    HTMLAttributes<HTMLAnchorElement> & {
      variant: Variant;
    }
  >
) {
  return (
    <a
      className={`m-button ${props.className}`}
      data-variant={props.variant}
      {...props}
    >
      {props.children}
    </a>
  );
}
