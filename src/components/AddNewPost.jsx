import {Fragment, useState, useEffect} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
} from "@chakra-ui/core";

import db from '../lib/firebase';

function AddNewPost() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [title, setTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit() {
        const date = new Date();

        await db.collection('posts')
            .add({
                title,
                upVotesCount: 0,
                downVotesCount: 0,
                createdAt: date.toUTCString(),
                updated: date.toUTCString(),
            });
        
        onClose();
        setTitle('');
    }

    return (
        <Fragment>
            <Button onClick={onOpen} colorScheme="blue">
                Add new post
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Add new post</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <FormControl id="post-title">
                                <FormLabel>Post title</FormLabel>
                                <Textarea
                                    type="post-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button onClick={onClose}>Close</Button>
                                <Button
                                    onClick={handleSubmit}
                                    colorScheme="blue"
                                    disabled={!title.trim()}
                                    isLoading={isSaving}
                                >
                                    Save
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </Fragment>
    );
}

export default AddNewPost;
