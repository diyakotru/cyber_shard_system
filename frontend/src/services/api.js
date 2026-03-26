const BASE_URL = "http://127.0.0.1:8000"

export async function getDocuments() {
  const res = await fetch(`${BASE_URL}/documents`)
  return res.json()
}

export async function createDocument(payload) {
  const res = await fetch(`${BASE_URL}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return res.json()
}

export async function recoverDocument(id) {
  await fetch(`${BASE_URL}/recover/${id}`, {
    method: "POST"
  })
}

export async function viewDocument(id) {
  const res = await fetch(`${BASE_URL}/view/${id}`)
  return res.json()
}

export const seedDocuments = async (docs) => {
  const res = await fetch("http://127.0.0.1:8000/seed", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(docs),
  })
  return res.json()
}

export const uploadDocument = async (id, content) => {
  const res = await fetch(`http://127.0.0.1:8000/upload/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  return res.json()
}

// export const simulateDelete = async (id) => {
//   await fetch(`http://127.0.0.1:8000/simulate-delete/${id}`, {
//     method: "DELETE",
//   })
// }

export const deleteDocument = async (id) => {
  await fetch(`http://127.0.0.1:8000/simulate-delete/${id}`, {
    method: "DELETE",
  })
}