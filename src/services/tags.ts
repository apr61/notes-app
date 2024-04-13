import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { TagDataType, TagType } from "../context/Tags";
import { db } from "../firebase-config";


export async function getAllTags(): Promise<TagType[]> {
    const allTags: TagType[] = []
    const querySnapShot = await getDocs(collection(db, "tags"))
    querySnapShot.forEach(doc => {
        const tempTag: TagType = {
            id: doc.id,
            tag: doc.data().tag
        }
        allTags.push(tempTag)
    })
    return allTags
}

export async function addNewTag(newTag: TagDataType): Promise<TagType> {
    const docRef = await addDoc(collection(db, "tags"), newTag)
    return { id: docRef.id, ...newTag }
}

export async function getTagByIds(tagIds: string[]): Promise<TagType[]> {
    const allTags: TagType[] = []
    for (const tagId of tagIds) {
        const docRef = doc(db, "tags", tagId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            allTags.push({ id: docSnap.id, tag: docSnap.data().tag })
        }
    }
    return allTags
}

export async function updateTagById(updatedTag: TagType): Promise<TagType | undefined> {
    const docRef = doc(db, "tags", updatedTag.id)
    try {
        await updateDoc(docRef, { tag: updatedTag.tag })
        return {id: updatedTag.id, tag: updatedTag.tag}
    } catch (error) {
        if (error instanceof Error) {
            return
        }
    }
}

export async function deleteTagById(id: string){
    const docRef = doc(db, "tags", id)
    try{
        await deleteDoc(docRef)
        return id
    }catch(err)
    {
        if(err instanceof Error){
            throw new Error(err.message)
        }
    }
}