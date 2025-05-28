import React from "react";
import { navigate } from "gatsby";
import { Formik, Form } from "formik";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import StepProgress from "@/components/molecules/StepProgress";
import TextInput from "@/components/atoms/TextInput";
import { useRequestStore } from "@/store/requestStore";
import { z } from "zod";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { requestSteps } from "@/constants/requestSteps";

const Step1Page: React.FC = () => {
  const { personalInfo, updatePersonalInfo, setStep } = useRequestStore();

  const validationSchema = z.object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .regex(
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        "Phone number is not valid"
      ),
  });

  const handleSubmit = (values: any) => {
    updatePersonalInfo(values);
    setStep(1);
    navigate("/request/step2");
  };

  return (
    <Layout>
      <Helmet>
        <title>Personal Information - DocuRequest</title>
      </Helmet>

      <div className="max-w-3xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <StepProgress currentStep={0} steps={requestSteps} />

        <div className="p-6 bg-white rounded-lg shadow md:p-8 animate-fade-in">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Personal Information
          </h1>
          <Formik
            initialValues={personalInfo}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={handleSubmit}
            validateOnMount={false}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ isValid, dirty }) => (
              <Form className="space-y-4">
                <TextInput
                  label="Full Name"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />

                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />

                <TextInput
                  label="Phone Number"
                  name="phone"
                  placeholder="(123) 456-7890"
                  required
                />

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="btn-secondary"
                  >
                    Back to Home
                  </button>

                  <button
                    type="submit"
                    disabled={!(isValid && dirty)}
                    className={`btn-primary ${
                      !(isValid && dirty) ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Continue to Document Type
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Step1Page;
