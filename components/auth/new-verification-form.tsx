"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    // fetch the verification token from the URL
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    // call the onSubmit function when the component mounts
    const onSubmit = useCallback(() => {
      if (success || error) return;

      // if there is no verification token, set an error
      if (!token) {
        setError("Missing token!");
        return;
      }

      // call the newVerification function from the actions/new-verification file
      newVerification(token)
      // if the promise resolves, set the success or error message
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError("Something went wrong!");
        })
    }, [token, success, error]);

    useEffect(() => {
      onSubmit();
    }, [onSubmit]);


  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  )
}
