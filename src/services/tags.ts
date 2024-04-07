import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
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

export async function getTagByIds(tagIds: string[]) : Promise<TagType[]> {
    const allTags: TagType[] = []
    for(const tagId of tagIds){
        const docRef = doc(db, "tags", tagId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            allTags.push({id: docSnap.id, tag: docSnap.data().tag})
        }
    }
    return allTags
}