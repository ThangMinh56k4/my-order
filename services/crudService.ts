import { collection, getDocs, type Firestore } from 'firebase/firestore'

export default class CrudSevice<T = any> {
  constructor(
    protected firestore: Firestore,
    protected collectionName: string,
  ) { }

  async getAll<R = T>(): Promise<R[]> {
    const querySnapshot = await getDocs(collection(this.firestore, this.collectionName))
    const dataList: R[] = []
    querySnapshot.forEach((doc) => {
      dataList.push({ id: doc.id, ...doc.data() } as R)
    })

    return dataList
  }
}
