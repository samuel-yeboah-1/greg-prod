import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function RegisterYourInterestForm() {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
      </div>
    </form>
  );
}

export default RegisterYourInterestForm;
