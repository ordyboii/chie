import { HTMLAttributes, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { Button as HeadlessButton } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { InferVariants, setupVariant } from "@/app/lib/setup-variant";

const variants = setupVariant({
  defaultClasses:
    "inline-flex justify-center items-center whitespace-nowrap rounded py-2 px-3 transition active:translate-y-0.5 focus:bg-yellow-300 focus:text-gray-950 focus:outline-2 focus:outline-offset-[-2px] focus:outline-gray-950",
  variants: {
    primary: "",
    secondary: "",
    teritary: "",
    danger: "",
    link: "underline text-blue-700 hover:bg-gray-100",
  },
});

export function LinkButton(props: PropsWithChildren<LinkProps>) {
  return (
    <Link
      className={variants("link")}
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
    variant: InferVariants<typeof variants>;
  }
) {
  return (
    <HeadlessButton className={variants(props.variant)} {...props}>
      {props.children}
    </HeadlessButton>
  );
}
