import {Fragment, useState, useEffect} from 'react';
import {IconButton, Text, VStack} from '@chakra-ui/core';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';

import db from '../lib/firebase';

function VoteButtons({ post }) {
    const [isVoting, setVoting] = useState(false);
    const [votedPosts, setVotedPosts] = useState([]);

    useEffect(() => {
        const votesFromLocalStorage = localStorage.getItem('votes') || [];
        let previousVotes = [];

        try {
            previousVotes = JSON.parse(votesFromLocalStorage);
        } catch (e) {
            console.log(e);
        }

        setVotedPosts(previousVotes);
    }, []);

    function handleDisablingOfVoting(postId) {
        const previousVotes = votedPosts;
        previousVotes.push(postId);

        setVotedPosts(previousVotes);

        localStorage.setItem('votes', JSON.stringify(votedPosts));
    }

    async function handleClick(type) {
        setVoting(true);

        let upVotesCount = post.upVotesCount;
        let downVotesCount = post.downVotesCount;

        const date = new Date();

        if (type === 'upvote') {
            upVotesCount = upVotesCount + 1;
        } else {
            downVotesCount = downVotesCount - 1;
        }

        await db.collection('posts')
                .doc(post.id)
                .set({
                    title: post.title,
                    upVotesCount,
                    downVotesCount,
                    createdAt: post.createdAt,
                    updatedAt: date.toUTCString(),
                });

        handleDisablingOfVoting(post.id);

        setVoting(false);
    }

    function checkIfPostIsAlreadyVoted() {
        return (votedPosts.indexOf(post.id) > -1);
    }

    return (
        <Fragment>
            <VStack>
                <IconButton 
                    size="lg"
                    colorScheme="purple"
                    aria-label="Upvote"
                    icon={<FiArrowUp />}
                    onClick={() => handleClick('upvote')}
                    isLoading={isVoting}
                    isDisabled={checkIfPostIsAlreadyVoted()}
                />
                <Text bg="gray.100" rounded="md" w="100%" p={1}>
                    {post.upVotesCount}
                </Text>
            </VStack>

            <VStack>
                <IconButton
                    size="lg"
                    colorScheme="yellow"
                    aria-label="Downvote"
                    icon={<FiArrowDown />}
                    onClick={() => handleClick('downvote')}
                    isLoading={isVoting}
                    isDisabled={checkIfPostIsAlreadyVoted()}
                />
                <Text bg="gray.100" rounded="md" w="100%" p={1}>
                    {post.downVotesCount}
                </Text>
            </VStack>
        </Fragment>
    );
}

export default VoteButtons;
