import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, or, query, updateDoc, where } from "firebase/firestore";
import { NoteDataType, NoteType } from "../context/Notes";
import { db } from "../firebase-config.js"

export async function addNewNote(newNote: NoteDataType): Promise<NoteType> {
    const docRef = await addDoc(collection(db, "notes"), newNote)
    return { id: docRef.id, ...newNote }
}

export async function getAllNotes(title: string, selectedTags: string[]): Promise<NoteType[]> {
    const allNotes: NoteType[] = []
    const notesRef = collection(db, "notes")
    let q;
    if (title.trim().length > 0 && selectedTags.length > 0) {
        q = query(notesRef, or(where('title', 'array-contains', title.split('')),
            where('tagIds', 'array-contains-any', selectedTags)))
    }
    else if (title.trim().length > 0) {
        q = query(notesRef, where('title', '>=', title), where('title', '<=', title + '\uf8ff'))
    } else if (selectedTags.length > 0) {
        q = query(notesRef, where('tagIds', 'array-contains-any', selectedTags))
    } else {
        q = query(notesRef, limit(9))
    }

    const querySnapshot = await getDocs(q)
    for (const doc of querySnapshot.docs) {
        const tempNote: NoteType = {
            id: doc.id,
            title: doc.data().title,
            markdown: doc.data().markdown,
            tagIds: doc.data().tagIds
        }
        allNotes.push(tempNote)
    }
    return allNotes
}


export async function getNoteById(id: string): Promise<NoteType | null> {
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

export async function updateNoteById(id: string, data: NoteDataType): Promise<NoteType | undefined> {
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