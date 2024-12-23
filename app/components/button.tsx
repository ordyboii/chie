import "./button.css";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes, PropsWithChildren } from "react";

type Variant = "secondary" | "danger" | "ghost";

export default function Button(
  props: PropsWithChildren<
    HTMLAttributes<HTMLButtonElement> & {
      variant?: Variant;
    }
  >
) {
  return (
    <button className="button" data-variant={props.variant} {...props}>
      {props.children}
    </button>
  );
}

export function InternalLinkButton(
  props: PropsWithChildren<LinkProps & { variant?: Variant }>
) {
  return (
    <Link className={`button ${props.variant ?? ""}`} {...props}>
      {props.children}
    </Link>
  );
}

export function ExternalLinkButton(
  props: PropsWithChildren<
    HTMLAttributes<HTMLAnchorElement> & {
      variant?: Variant;
    }
  >
) {
  return (
    <a className={`button ${props.variant ?? ""}`} {...props}>
      {props.children}
    </a>
  );
}
