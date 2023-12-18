import { firebase } from "../config/FirebaseConfig";

const db = firebase.firestore();
export const createdAt = firebase.firestore.FieldValue.serverTimestamp();
// const randomSt = Math.random().toString(36).substring(2, 11);

//------------------------firebase storage -> getImageUrl------------------//
export async function imageGetUrl(images) {
  let imageResult = [];
  let imageName = [];
  for (let i = 0; i < images.length; i++) {
    const responce = await fetch(images[i]);
    const blob = await responce.blob();
    const fileName = images[i].substring(images[i].lastIndexOf("/") + 1);
    const result = await firebase.storage().ref().child(fileName).put(blob);
    const imageUrl = await result.ref.getDownloadURL();
    imageResult.push(imageUrl);
    imageName.push(fileName);
  }
  return { imageResult: imageResult, imageName: imageName };
}
//--------------------------------------------------------------------------//
// export function createContent(collection, content) {
//   return 
//     .collection(collection)
//     .doc("D" + randomSt)
//     .set({ content, createdAt: createdAt });
// }
export function createContent({ collection, content} ) {
  return db.collection(collection).add( content);
}

//--------------------------------------------------------------------------//
export function removeContent({ collection, id }) {
  return db.collection(collection).doc(id).delete();
}
//--------------------------------------------------------------------------//
export function removeImage(imageName) {
  for (let i = 0; i < imageName.length; i++){
    let imageRef = firebase.storage().ref('/' + imageName[i])
    imageRef.delete().then
  }
}

//--------------------------------------------------------------------------//
export function updateContent({ collection, content, id }) {
  return db.collection(collection).doc(id).update(
    content,
  );
}
//--------------------------------------------------------------------------//
export async function getContent({ collection, mode, id,limit } = {}) {
  let query = db.collection(collection).orderBy("createdAt", "desc").limit(limit);

  if (id) {
    const cursorDoc = await db.collection(collection).doc(id).get();
    query =
      mode === "older"
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();
  const content = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(content.length);
  return content;
}
//--------------------------------------------------------------------------//
export async function getOlderContent(id, collection,limit) {
  return getContent({
    id,
    collection,
    mode: "older",
    limit
  });
}

export async function getNewerContent(id, collection) {
  return getContent({
    id,
    collection,
    mode: "newer",
  });
}
