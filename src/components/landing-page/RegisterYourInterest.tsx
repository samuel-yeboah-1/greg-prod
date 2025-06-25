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
    <Card className="min-w-96">
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
  );
}

export default RegisterYourInterest;
