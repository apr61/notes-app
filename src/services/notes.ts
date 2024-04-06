import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { NoteDataType, NoteType } from "../context/Notes";
import { db } from "../firebase-config.js"

export async function addNewNote(newNote: NoteDataType) : Promise<NoteType> {
    const docRef =  await addDoc(collection(db, "notes"), newNote)
    return {id: docRef.id, ...newNote}
}

export async function getAllNotes(): Promise<NoteType[]> {
    const allNotes: NoteType[] = []
    const querySnapshot = await getDocs(collection(db, "notes"))
    querySnapshot.forEach((doc) => {
        const tempNote: NoteType = {
            id: doc.id,
            title: doc.data().title,
            markdown: doc.data().markdown
        }
        allNotes.push(tempNote)
    })
    return allNotes
}


export async function getNoteById(id: string): Promise<NoteType | null> {
    const docRef = doc(db, "notes", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return {id: id, title: docSnap.data().title, markdown: docSnap.data().markdown}
    }else{
        return null
    }
}

export async function updateNoteById(data: NoteType) {
    const docRef = doc(db, "notes", data.id)
    try{
        await updateDoc(docRef, {title: data.title, markdown: data.markdown})
    }catch(error){
        if(error instanceof Error){
            return
        }
    }
}

export async function deleteNoteById(id: string){
    const docRef = doc(db, "notes", id)
    await deleteDoc(docRef)
}