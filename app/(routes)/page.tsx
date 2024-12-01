import Button, { LinkButton } from "@/app/components/button";
import { Field, Input, Label } from "@headlessui/react";

export default function Home() {
  return (
    <div>
      <Button variant="primary">Start now</Button>
      <Button variant="secondary">Start now</Button>
      <Button variant="danger">Start now</Button>
      <LinkButton href="/">Start now</LinkButton>
      <Button variant="teritary">Start now</Button>
      <Field className="ji-input-group">
        <Label className="ji-label">What?</Label>
        <Input className="ji-input" />
      </Field>
    </div>
  );
}
