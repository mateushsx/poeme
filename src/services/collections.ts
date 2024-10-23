import { collection } from 'firebase/firestore';

import { db } from './firebase';

export const versesCollection = collection(db, 'verses');
