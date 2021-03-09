// javascript example
// TS would compile to something like this
const db = {
  insert: async user => {
    console.log(JSON.stringify(user))
  }
}

const insertUser = async ({ firstName, lastName, email }) => {
  const id = Math.floor(Math.random() * 2000)
  await db.insert({ id, firstName, lastName, email })
}
