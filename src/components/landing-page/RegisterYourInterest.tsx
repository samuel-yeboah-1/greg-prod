import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterYourInterestForm from "../forms/RegisterYourInterestForm";

function RegisterYourInterest() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <div className="flex-1">

      </div>
    <Card className="flex-1 w-full">
      <CardHeader>
        <CardTitle>Register your interest</CardTitle>
        <CardDescription>Enter your email below to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterYourInterestForm />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Register your interest
        </Button>

        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default RegisterYourInterest;
