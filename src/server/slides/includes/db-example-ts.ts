// typescript
type User = Readonly<{
  id?: number
  firstName: string
  lastName: string
  email: string
}>

const db = {
  insert: async (record: User): Promise<void> => {
    console.log(JSON.stringify(record))
  }
}

const insertUser = async ({ firstName, lastName, email }: User) => {
  const id = Math.floor(Math.random() * 2000)
  await db.insert({ id, firstName, lastName, email })
}
