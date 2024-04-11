import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NoteDataType, NoteDbType } from "../context/Notes";
import { db } from "../firebase-config.js"

export async function addNewNote(newNote: NoteDataType): Promise<NoteDbType> {
    const docRef = await addDoc(collection(db, "notes"), newNote)
    return { id: docRef.id, ...newNote }
}

export async function getAllNotes(): Promise<NoteDbType[]> {
    const allNotes: NoteDbType[] = []
    const querySnapshot = await getDocs(collection(db, "notes"))
    for (const doc of querySnapshot.docs) {
        const tempNote: NoteDbType = {
            id: doc.id,
            title: doc.data().title,
            markdown: doc.data().markdown,
            tagIds: doc.data().tagIds
        }
        allNotes.push(tempNote)
    }
    return allNotes
}


export async function getNoteById(id: string): Promise<NoteDbType | null> {
    const docRef = doc(db, "notes", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return {
            id: id,
            title: docSnap.data().title,
            markdown: docSnap.data().markdown,
            tagIds: docSnap.data().tagIds
        }
    } else {
        return null
    }
}

export async function updateNoteById(id: string, data: NoteDataType): Promise<NoteDbType | undefined> {
    const docRef = doc(db, "notes", id)
    try {
        await updateDoc(docRef, { title: data.title, markdown: data.markdown, tagIds: data.tagIds })
        return { id: id, title: data.title, markdown: data.markdown, tagIds: data.tagIds }
    } catch (error) {
        if (error instanceof Error) {
            return
        }
    }
}

export async function deleteNoteById(id: string) {
    const docRef = doc(db, "notes", id)
    await deleteDoc(docRef)
}