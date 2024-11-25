import { HTMLAttributes, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { Button as HeadlessButton } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

const defaultButtonClass =
  "inline-flex justify-center items-center whitespace-nowrap rounded py-2 px-3 transition active:translate-y-0.5 focus:bg-yellow-300 focus:text-gray-950 focus:outline-2 focus:outline-offset-[-2px] focus:outline-gray-950";

type Variant = "default" | "secondary" | "teritary" | "danger";

function getClassFromVariant(variant: Variant) {
  if (variant === "default") {
    return;
  }
}

export function LinkButton(props: PropsWithChildren<LinkProps>) {
  return (
    <Link
      className={`${defaultButtonClass} underline text-blue-700 hover:bg-gray-100`}
      role="button"
      draggable="false"
      {...props}
    >
      {props.children} <ChevronRightIcon className="w-5" aria-hidden="true" />
    </Link>
  );
}

export default function Button(
  props: PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
    variant: Variant;
  }
) {
  return (
    <HeadlessButton className={getClassFromVariant(props.variant)} {...props}>
      {props.children}
    </HeadlessButton>
  );
}
