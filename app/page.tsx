import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
    <div className="flex">
      <button className="m-button" data-variant="primary">
        Hello
      </button>
      <a className="m-button">
        Hello
        <ChevronRightIcon aria-hidden="true" />
      </a>
    </div>
  );
}
