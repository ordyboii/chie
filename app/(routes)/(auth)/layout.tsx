import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout(props: { children: ReactNode }) {
  return (
    <>
      <header>
        <div>
          <Image src="logo.svg" alt="JiraIpsum logo" width={150} height={50} />
        </div>
      </header>
      <main>{props.children}</main>
    </>
  );
}
