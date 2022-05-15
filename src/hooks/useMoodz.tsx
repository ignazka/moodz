import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useState } from 'react'
import useAuth from '../context/authContext';

export function useMoodz() {
    const [moodz, setMoodz] = useState<any | null>([{}]);
    const { user } = useAuth();

    const setMood = async (inputTerm: any) => {
        try {
            await addDoc(collection(db, `users/${user?.uid}/moodz`), {
                value: inputTerm.sliderValue,
                note: inputTerm.moodNote,
                user: user?.uid,
                addedAt: Timestamp.fromDate(new Date()),
            });
        } catch (e) {
        } finally {
            console.log("mood saved");
        }
    };

    /**
     * get data from firebase
     */
    const getMoodz = async () => {
        const querySnapshot = await getDocs(
            collection(db, `users/${user?.uid}/moodz`)
        );
        let arr: any = [];
        querySnapshot.forEach(doc => {
            // console.log(doc.id, ' => ', doc.data());
            arr.push({
                name: doc.data().addedAt.seconds,
                moodLevel: doc.data().value,
                note: doc.data().note,
            });
        });
        const sorted = arr.sort((a: any, b: any): any => a.name - b.name);
        arr = [{}];
        sorted.forEach((element: any) => {
            arr.push({
                name: new Date(element.name * 1000).toLocaleDateString(),
                moodLevel: element.moodLevel,
                note: element.note,
            });
        });
        setMoodz(arr);
        console.log("get moodz from server");
    };
    return {
        setMood, getMoodz, moodz
    }
}