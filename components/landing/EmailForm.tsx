import { useState } from "react";
import { Callout } from "nextra/components";
import { usePostHog } from "posthog-js/react";

import { identifyUser, recordEvent } from "../../src/analytics";
import { Button } from "../ui/button";

const INIT = "INIT";
const SUBMITTING = "SUBMITTING";
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
const formStates = [INIT, SUBMITTING, ERROR, SUCCESS] as const;
const formStyles = {
  id: "clp38odyv0069le0phi4wl0s3",
  name: "Default",
  formStyle: "inline",
  placeholderText: "you@example.com",
  formFontColor: "#000000",
  formFontSizePx: 14,
  buttonText: "Get updates",
  buttonFontColor: "#ffffff",
  buttonColor: "#042853",
  buttonFontSizePx: 14,
  successMessage: "Thanks! We'll keep you posted!",
  successFontColor: "#fff",
  successFontSizePx: 18,
  userGroup: "Newsletter",
};
const domain = "app.loops.so";

export default function SignUpForm() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <SignUpFormReact />
    </div>
  );
}

function SignUpFormReact() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<(typeof formStates)[number]>(INIT);
  const [errorMessage, setErrorMessage] = useState("");
  const posthog = usePostHog();

  const resetForm = () => {
    setEmail("");
    setFormState(INIT);
    setErrorMessage("");
  };

  /**
   * Rate limit the number of submissions allowed
   * @returns {boolean} true if the form has been successfully submitted in the past minute
   */
  const hasRecentSubmission = () => {
    const time = new Date();
    const timestamp = time.valueOf();
    const previousTimestamp = localStorage.getItem("loops-form-timestamp");

    // Indicate if the last sign up was less than a minute ago
    if (
      previousTimestamp &&
      Number(previousTimestamp) + 60 * 1000 > timestamp
    ) {
      setFormState(ERROR);
      setErrorMessage("Too many signups, please try again in a little while");
      recordEvent(posthog, "waitlist.error", {
        category: "Submit waitlist form",
        success: false,
        errorMessage: "Too many signups, please try again in a little while",
      });
      return true;
    }

    localStorage.setItem("loops-form-timestamp", timestamp.toString());
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    event.preventDefault();

    // boundary conditions for submission
    if (formState !== INIT) return;
    if (!isValidEmail(email)) {
      setFormState(ERROR);
      setErrorMessage("Please enter a valid email");
      recordEvent(posthog, "waitlist.error", {
        category: "Submit waitlist form",
        success: false,
        errorMessage: "Please enter a valid email",
      });
      return;
    }
    if (hasRecentSubmission()) return;
    setFormState(SUBMITTING);

    // build body
    const formBody = `userGroup=${encodeURIComponent(
      formStyles.userGroup
    )}&email=${encodeURIComponent(email)}`;

    // API request to add user to newsletter
    fetch(`https://${domain}/api/newsletter-form/${formStyles.id}`, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res: any) => [res.ok, res.json(), res])
      .then(([ok, dataPromise, res]) => {
        if (ok) {
          resetForm();
          setFormState(SUCCESS);
          identifyUser(posthog, email);
          recordEvent(posthog, "waitlist.success", {
            category: "Submit waitlist form",
            success: true,
          });
        } else {
          dataPromise.then((data: any) => {
            setFormState(ERROR);
            setErrorMessage(data.message || res.statusText);
            localStorage.setItem("loops-form-timestamp", "");
          });
        }
      })
      .catch((error) => {
        setFormState(ERROR);
        // check for cloudflare error
        if (error.message === "Failed to fetch") {
          setErrorMessage("An error occured, please try again later");
          recordEvent(posthog, "waitlist.error", {
            category: "Submit waitlist form",
            success: false,
            errorMessage: "Failed to fetch - cloudflare error",
          });
        } else if (error.message) {
          setErrorMessage(error.message);
          recordEvent(posthog, "waitlist.error", {
            category: "Submit waitlist form",
            success: false,
            errorMessage: error.message,
          });
        }
        localStorage.setItem("loops-form-timestamp", "");
      });
  };

  const isInline = formStyles.formStyle === "inline";

  switch (formState) {
    case SUCCESS:
      return (
        <div
          className="mt-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              color: formStyles.successFontColor,
              fontSize: `${formStyles.successFontSizePx}px`,
            }}
          >
            {formStyles.successMessage}
          </p>
        </div>
      );
    case ERROR:
      return <SignUpFormError />;
    default:
      return (
        <>
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex-wrap"
            style={{
              display: "flex",
              flexDirection: isInline ? "row" : "column",
              alignItems: "baseline",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <input
              type="text"
              name="email"
              className={`mb-4 sm:mb-0 ${isInline ? "mr-4" : ""}`}
              placeholder={formStyles.placeholderText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              style={{
                color: formStyles.formFontColor,
                fontSize: `${formStyles.formFontSizePx}px`,
                width: "100%",
                maxWidth: "300px",
                minWidth: "100px",
                background: "#FFFFFF",
                border: "1px solid #D1D5DB",
                boxSizing: "border-box",
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px",
                borderRadius: "6px",
                padding: "8px 12px",
              }}
            />
            <SignUpFormButton />
          </form>
        </>
      );
  }

  function SignUpFormError() {
    return (
      <Callout type="error">
        {errorMessage || "Oops! Something went wrong, please try again"}
      </Callout>
    );
  }

  function SignUpFormButton({ props }: any) {
    return (
      <Button type="submit" className="px-4" variant="secondary">
        {formState === SUBMITTING ? "Please wait..." : formStyles.buttonText}
      </Button>
    );
  }
}

function isValidEmail(email: any) {
  return /.+@.+/.test(email);
}
