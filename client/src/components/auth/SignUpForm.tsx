//React elements and hooks imports
import { FunctionComponent } from 'react'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

//Components imports
import { Center, TextInput, Title, Button, Stack, Grid, PasswordInput, Anchor } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
//Styling elements imports

//Redux actions imports
import { signUp } from '_store/auth/authSlice';

//Typescript models & enums imports
import { ISignUpModel } from '_types/models/users/ISignUpModel';

interface IProps {
    setExistingUser: any;
}
const schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .required('Password is required')
        .matches(/[A-Z]/, 'Le mot de passe doit contenir 8 caractères minimum, 1 lettre majuscule, 1 caractère spécial et 1 chiffre')
        .matches(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, 'Le mot de passe doit contenir 8 caractères minimum, 1 lettre majuscule, 1 caractère spécial et 1 chiffre')
        .matches(/[0-9]/, 'Le mot de passe doit contenir 8 caractères minimum, 1 lettre majuscule, 1 caractère spécial et 1 chiffre'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .test('equal', 'Les mots de passe doivent être identiques', function test(v) {
            const ref = Yup.ref('password');
            return v === this.resolve(ref);
        }),
});
const SignUpForm: FunctionComponent<IProps> = ({ setExistingUser }) => {
    const dispatch = useDispatch();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: "",
            lastName: "",
        },
        validate: yupResolver(schema),
    });

    const handleSubmit = (values: ISignUpModel) => {
        dispatch(signUp(values))
    }

    return (
        <Center>
            <form onSubmit={form.onSubmit((values: ISignUpModel) => handleSubmit(values))}>
                <Grid grow justify="center" align="center" >
                    <Grid.Col span={12}>
                        <Title align="center" order={2}>Sign Up</Title>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="First Name" placeholder="First Name" {...form.getInputProps('firstName')} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Last Name" placeholder="Last Name" {...form.getInputProps('lastName')} />
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
                        <PasswordInput
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            required
                            {...form.getInputProps('confirmPassword')}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Stack align="center" spacing="lg">
                            <Button type="submit">Submit</Button>
                            <Anchor onClick={() => setExistingUser(true)} >
                                Already have an account? Sign In
                            </Anchor>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </form>
        </Center>
    )
}


export default SignUpForm