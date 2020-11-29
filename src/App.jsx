import {Fragment, useEffect, useState} from 'react';
import {Container, Flex, Spinner, VStack} from '@chakra-ui/core';

import db from './lib/firebase';
import Post from './components/Post';
import Navbar from './components/Navbar';

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                setPosts(data);
            });
    }, []);

    useEffect(() => {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot((querySnapshot) => {
                const _posts = [];

                querySnapshot.forEach((doc) => {
                    _posts.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setPosts(_posts);
            });
    }, []);

    return (
        <Fragment>
            <Navbar />
            <Container maxW="md" centerContent p={8}>
                <VStack spacing={8} w="100%">
                    {posts.map((post) => (
                        <Post post={post} key={post.id} />
                    ))}
                </VStack>
            </Container>
        </Fragment>
    );
}

export default App;
