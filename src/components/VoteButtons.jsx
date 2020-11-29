import {Fragment, useState} from 'react';
import {IconButton, Text, VStack} from '@chakra-ui/core';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';

import db from '../lib/firebase';

function VoteButtons({ post }) {
    async function handleClick(type) {
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
                />
                <Text bg="gray.100" rounded="md" w="100%" p={1}>
                    {post.downVotesCount}
                </Text>
            </VStack>
        </Fragment>
    );
}

export default VoteButtons;
