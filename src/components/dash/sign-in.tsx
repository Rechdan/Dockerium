import { FormEventHandler, memo, useCallback, useRef } from "react";
import { toast } from "react-toastify";

import styled from "styled-components";

import { BORDER_SIDEBAR_TITLE, COLOR_FONT, COLOR_FONT_2, COLOR_SIDEBAR, COLOR_SIDEBAR_ITEM_LINK_ACTIVE, PROJECT_NAME, SHADOW_SIGNIN } from "_/consts";

import { useAccountAuth } from "_/api/account-auth";
import accountLogin from "_/api/account-login";

const StyledContainer = styled.div`
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  min-height: 100vh;
  flex-flow: column;
  display: flex;
  width: 100%;
`;

const StyledBox = styled.div`
  flex: 0 0 auto;
  background-color: ${COLOR_SIDEBAR};
  box-shadow: ${SHADOW_SIGNIN};
  border-radius: 1rem;
  padding: 3rem 2rem;
  flex-flow: column;
  max-width: 24rem;
  display: flex;
  width: 100%;
  gap: 3rem;
`;

const StyledTitle = styled.div`
  border-bottom: ${BORDER_SIDEBAR_TITLE};
  text-align: center;
  font-weight: 900;
  font-size: 2rem;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  flex: 0 0 auto;
  flex-flow: column;
  display: flex;
  gap: 1rem;
`;

const StyledFormCell = styled.div<{ $small?: boolean }>`
  flex: ${(p) => (p.$small ? "0 0 auto" : "1 1 100%")};
  flex-flow: column;
  display: flex;
  gap: 0.5rem;
`;

const StyledFormInput = styled.input`
  flex: 0 0 auto;
  background-color: ${COLOR_FONT};
  color: ${COLOR_FONT_2};
  background-color: 0;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
`;

const StyledFormSubmit = styled.button`
  flex: 0 0 auto;
  background-color: ${COLOR_SIDEBAR_ITEM_LINK_ACTIVE};
  border-radius: 3rem;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem;
`;

const SignIn = memo(() => {
  const { mutate: accountAuthMutate } = useAccountAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      const [email, password] = [emailRef.current?.value, passwordRef.current?.value];

      if (typeof email === "undefined" || typeof password === "undefined") {
        toast.error("Invalid fields!");
      } else {
        const response = await accountLogin(email, password);

        switch (response.type) {
          case "success":
            toast.success("Login successful!");
            accountAuthMutate({ type: "success" });
            break;
        }
      }
    },
    [accountAuthMutate]
  );

  return (
    <StyledContainer>
      <StyledBox>
        <StyledTitle>{PROJECT_NAME}</StyledTitle>
        <StyledForm onSubmit={onSubmit}>
          <StyledFormCell>
            <StyledFormInput ref={emailRef} placeholder="Email" type="email" />
          </StyledFormCell>
          <StyledFormCell>
            <StyledFormInput ref={passwordRef} placeholder="Password" type="password" />
          </StyledFormCell>
          <StyledFormCell $small>
            <StyledFormSubmit type="submit">Submit</StyledFormSubmit>
          </StyledFormCell>
        </StyledForm>
      </StyledBox>
    </StyledContainer>
  );
});

export default SignIn;
