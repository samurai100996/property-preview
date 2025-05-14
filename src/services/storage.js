import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

const storage = getStorage(app);

export const uploadPropertyImages = async (files) => {
  const urls = [];
  for (const file of files) {
    const storageRef = ref(storage, `properties/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    urls.push(await getDownloadURL(storageRef));
  }
  return urls;
};