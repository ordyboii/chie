import { HTMLAttributes, PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import { Button as HeadlessButton } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { InferVariants, setupVariants } from "@/app/lib/setup-variants";

const variants = setupVariants({
  defaultClasses:
    "inline-flex justify-center items-center whitespace-nowrap rounded py-2 px-3 font-bold transition active:translate-y-0.5 focus:bg-yellow-300 focus:text-gray-950 focus:outline-2 focus:outline-offset-[-2px] focus:outline-gray-950",
  variants: {
    primary: "bg-blue-700 text-white hover:bg-blue-800",
    secondary: "border border-gray-700 text-gray-950 hover:bg-gray-100",
    teritary: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    danger: "bg-amber-700 text-white hover:bg-amber-800",
    link: "underline text-blue-700 hover:bg-blue-100",
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
