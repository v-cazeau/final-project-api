import { MongoClient } from 'mongodb';
import { MONGOURI } from '../secrets.js';

export const client = new MongoClient(MONGOURI)

const db = client.db('final-project-bc')