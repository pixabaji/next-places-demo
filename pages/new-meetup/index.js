import { useRouter } from 'next/router';
import { Fragment } from 'react';
import Head from 'next/head';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
    const router = useRouter();
    const addMeetupHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            body: JSON.stringify(meetupData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.replace('/');
    };

    return <Fragment>
        <Head>
            <title>Next Meetups</title>
            <meta name='description' content='add new meetup'></meta>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>
};

export default NewMeetup;