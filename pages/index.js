import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head  from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

const PW = 'LM10forever';
const MONGO_CREDENTIALS = `mongodb+srv://ivorbze:${PW}@cluster0.ynjjq.mongodb.net/meetups?retryWrites=true&w=majority`;

const HomePage = (props) => {
    return <Fragment>
        <Head>
            <title>Next Meetups</title>
            <meta name='description' content='Browse a wide list of options for your next meetup'></meta>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>
};

export async function getStaticProps() {
    // fetch
    const mongoConn = await MongoClient.connect(MONGO_CREDENTIALS);

    const db = mongoConn.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    mongoConn.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}

export default HomePage;