//React elements and hooks imports
import { FunctionComponent, useEffect } from 'react'

//Components imports
import { Center, Container, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser, selectAuth } from '_store/auth/authSlice';

//Styling elements imports

//Redux actions imports

//Typescript models & enums imports

const HomeView: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(selectAuth);
    useEffect(()=>{
        dispatch(currentUser())
    },[])

    return (
        <Container>
            <Center>
                <Title align="center" order={1}>Home Page</Title>
            </Center>
            <Center>
                <Title align="center" order={1}>{user?.firstName}</Title>
            </Center>
        </Container>
    )
}


export default HomeView