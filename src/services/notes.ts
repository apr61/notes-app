import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NoteDataType, NoteType } from "../context/Notes";
import { db } from "../firebase-config.js"
import { getTagByIds } from "./tags.js";
import { TagType } from "../context/Tags.js";

export async function addNewNote(newNote: NoteDataType): Promise<NoteType> {
    const docRef = await addDoc(collection(db, "notes"), newNote)
    const tagsWithIds = await getTagByIds(newNote.tagIds)
    return { id: docRef.id, tags: tagsWithIds, ...newNote }
}

export async function getAllNotes(): Promise<NoteType[]> {
    const allNotes: NoteType[] = []
    const querySnapshot = await getDocs(collection(db, "notes"))
    for (const doc of querySnapshot.docs) {
        const tagsWithIds: TagType[] = await getTagByIds(doc.data().tagIds)
        const tempNote: NoteType = {
            id: doc.id,
            title: doc.data().title,
            markdown: doc.data().markdown,
            tags: tagsWithIds
        }
        allNotes.push(tempNote)
    }
    return allNotes
}


export async function getNoteById(id: string): Promise<NoteType | null> {
    const docRef = doc(db, "notes", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const tagsWithIds = await getTagByIds(docSnap.data().tagIds)
        return { id: id, title: docSnap.data().title, markdown: docSnap.data().markdown, tags: tagsWithIds }
    } else {
        return null
    }
}

export async function updateNoteById(id: string, data: NoteDataType): Promise<NoteType | undefined> {
    const docRef = doc(db, "notes", id)
    try {
        await updateDoc(docRef, { title: data.title, markdown: data.markdown, tagIds: data.tagIds })
        const tagsWithIds: TagType[] = await getTagByIds(data.tagIds)
        return {id: id, title: data.title, markdown: data.markdown, tags: tagsWithIds}
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