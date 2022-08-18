//React elements and hooks imports
import { FunctionComponent } from 'react'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

//Components imports
import { Center, TextInput, Title, Button, Stack, Grid, PasswordInput, Anchor } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
//Styling elements imports

//Redux actions imports
import { signIn } from '_store/auth/authSlice';

//Typescript models & enums imports

interface IProps {
    setExistingUser: any;
}
const validation = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Le nouveau mot de passe doit contenir au moins 8 caractères")
        .required("Le mot de passe est requis"),
});
const SignInForm: FunctionComponent<IProps> = ({ setExistingUser }) => {
    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: yupResolver(validation),
    });

    const handleSubmit = (values: { email: string, password: string }) => {
        dispatch(signIn(values))
    }

    return (
        <Center>
            <form onSubmit={form.onSubmit((values: { email: string, password: string }) => handleSubmit(values))}>
                <Grid grow justify="center" align="center" >
                    <Grid.Col span={12}>
                        <Title align="center" order={2}>Sign In</Title>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput required mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <PasswordInput
                            placeholder="Password"
                            label="Password"
                            required
                            {...form.getInputProps('password')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Stack align="center" spacing="lg">
                            <Button type="submit">Submit</Button>
                            <Anchor onClick={() => setExistingUser(false)} >
                                Don't have an account? Sign Up
                            </Anchor>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </form>
        </Center>
    )
}


export default SignInForm