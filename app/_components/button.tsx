import { HTMLAttributes, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { Button as HeadlessButton } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export function LinkButton(props: PropsWithChildren<LinkProps>) {
  return (
    <Link
      className="ji-button ji-button--link"
      role="button"
      draggable="false"
      {...props}
    >
      {props.children}{" "}
      <ChevronRightIcon className="ji-icon" aria-hidden="true" />
    </Link>
  );
}

export default function Button(
  props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
    variant: "default" | "secondary" | "teritary" | "danger";
  }
) {
  const variantClass = `ji-button--${props.variant}`;

  return (
    <HeadlessButton className={`ji-button ${variantClass}`} {...props}>
      {props.children}
    </HeadlessButton>
  );
}
