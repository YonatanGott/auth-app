//React elements and hooks imports
import { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//Components imports
import { Container, Grid } from "@mantine/core";
import SignUpForm from "_components/auth/SignUpForm";
import SignInForm from "_components/auth/SignInForm";

//Styling elements imports

//Redux actions imports
import { selectAuth } from "_store/auth/authSlice";

//Typescript models & enums imports

const AuthView: FunctionComponent = () => {
    const [existingUser, setExistingUser] = useState<boolean>(true);
    const { loggedIn } = useSelector(selectAuth);
    return (
        loggedIn ? <Navigate to="/home" /> :
        <Container style={{ padding: "1rem" }}>
            <Grid  justify="center" align="center">
                <Grid.Col span={6}>
                    {
                        existingUser ? <SignInForm setExistingUser={setExistingUser} /> : <SignUpForm setExistingUser={setExistingUser} />
                    }
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default AuthView;
