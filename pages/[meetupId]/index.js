import { Fragment } from "react";
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';

const MeetupDetailsPage = (props) => {
    return <MeetupDetails
     image={props.meetupDetails.image}
     title={props.meetupDetails.title}
     address={props.meetupDetails.address}
     description={props.meetupDetails.description}/>
};

export async function getStaticPaths() {
    const mongoConn = await MongoClient.connect('mongodb+srv://ivorbze:LM10forever@cluster0.ynjjq.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = mongoConn.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

    mongoConn.close();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        }))
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const mongoConn = await MongoClient.connect('mongodb+srv://ivorbze:LM10forever@cluster0.ynjjq.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = mongoConn.db();

    const meetupCollection = db.collection('meetups');

    const meetup = await meetupCollection.findOne({_id: ObjectId(meetupId)});

    mongoConn.close();

    return {
        props: {
            meetupDetails: {
                id: meetup._id.toString(),
                image: meetup.image,
                title: meetup.title,
                address: meetup.address,
                description: meetup.description
            }
        }
    }
}

export default MeetupDetailsPage;